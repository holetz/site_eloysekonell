#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const { ROOT_DIR, SRC_DIR, DIST_DIR, TEMPLATES_DIR } = require("./paths");

const INCLUDE_PATTERN = /<!--\s*INCLUDE:\s*([^\n\r]+?)\s*-->/g;
const ATTR_URL_PATTERN =
  /(\s(?:src|href|poster|data-[\w-]*src)\s*=\s*)(["'])([^"']+)\2/gi;
const CSS_URL_PATTERN = /url\(\s*(['"]?)([^'"\)]+)\1\s*\)/gi;

const ASSET_MAP = {
  "nicepage.css": path.join(SRC_DIR, "vendor/nicepage/nicepage.css"),
  "nicepage.js": path.join(SRC_DIR, "vendor/nicepage/nicepage.js"),
  "jquery.js": path.join(SRC_DIR, "vendor/jquery/jquery-1.9.1.min.js"),
  "index.css": "GENERATE_INDEX_CSS",
};

const args = new Set(process.argv.slice(2));
const options = {
  minify: args.has("--minify"),
  sourcemap: args.has("--sourcemap"),
};

const stats = {
  includesResolved: 0,
  copiedFiles: 0,
  copiedBytes: 0,
};

function isExternalUrl(value) {
  return (
    /^(?:[a-z]+:)?\/\//i.test(value) ||
    /^(?:mailto:|tel:|javascript:|data:|#)/i.test(value)
  );
}

function normalizeIncludePath(rawIncludePath) {
  const includePath = rawIncludePath.trim().replace(/\\/g, "/");
  return includePath.endsWith(".html") ? includePath : `${includePath}.html`;
}

function rewriteRelativePath(assetPath) {
  if (!assetPath || isExternalUrl(assetPath)) {
    return assetPath;
  }

  if (assetPath.startsWith("/")) {
    return assetPath;
  }

  if (/^(\.\.\/)+/.test(assetPath)) {
    return `./${assetPath.replace(/^(\.\.\/)+/, "")}`;
  }

  if (!assetPath.startsWith("./")) {
    return `./${assetPath}`;
  }

  return assetPath;
}

function rewriteAssetPaths(html) {
  const withRewrittenAttrs = html.replace(
    ATTR_URL_PATTERN,
    (fullMatch, prefix, quote, assetPath) => {
      const rewritten = rewriteRelativePath(assetPath);
      return `${prefix}${quote}${rewritten}${quote}`;
    },
  );

  return withRewrittenAttrs.replace(
    CSS_URL_PATTERN,
    (fullMatch, quote, assetPath) => {
      const rewritten = rewriteRelativePath(assetPath);
      return `url(${quote}${rewritten}${quote})`;
    },
  );
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveIncludeFile(includeRef) {
  const normalizedRef = normalizeIncludePath(includeRef);
  const candidates = [
    path.join(SRC_DIR, normalizedRef),
    path.join(TEMPLATES_DIR, normalizedRef),
  ];

  for (const candidate of candidates) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  return null;
}

async function parseIncludes(content, trace = [], sourcemapEntries = []) {
  const matches = Array.from(content.matchAll(INCLUDE_PATTERN));

  if (matches.length === 0) {
    return content;
  }

  let result = content;

  for (const match of matches) {
    const includeRef = match[1].trim();
    const includeFile = await resolveIncludeFile(includeRef);

    if (!includeFile) {
      throw new Error(`Include não encontrado: "${includeRef}"`);
    }

    if (trace.includes(includeFile)) {
      const cycle = [...trace, includeFile]
        .map((entry) => path.relative(ROOT_DIR, entry))
        .join(" -> ");
      throw new Error(`Include circular detectado: ${cycle}`);
    }

    const includeContent = await fs.readFile(includeFile, "utf8");
    const resolvedIncludeContent = await parseIncludes(
      includeContent,
      [...trace, includeFile],
      sourcemapEntries,
    );

    sourcemapEntries.push({
      include: includeRef,
      source: path.relative(ROOT_DIR, includeFile),
    });

    result = result.replace(match[0], resolvedIncludeContent);
    stats.includesResolved += 1;
  }

  return result;
}

function minifyHtml(html) {
  return html
    .replace(/<!--(?!\[if)([\s\S]*?)-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function collectAssetReferences(html) {
  const refs = new Set();

  for (const match of html.matchAll(ATTR_URL_PATTERN)) {
    const value = match[3];
    if (value && !isExternalUrl(value)) {
      refs.add(value);
    }
  }

  for (const match of html.matchAll(CSS_URL_PATTERN)) {
    const value = match[2];
    if (value && !isExternalUrl(value)) {
      refs.add(value);
    }
  }

  return refs;
}

function sourcePathFromDistReference(refPath) {
  const normalized = refPath.replace(/^\.\//, "").replace(/^\/+/, "");

  const srcPrefixMap = [
    { prefix: "assets/", base: path.join(SRC_DIR, "assets") },
    { prefix: "vendor/", base: path.join(SRC_DIR, "vendor") },
    { prefix: "styles/", base: path.join(SRC_DIR, "styles") },
    { prefix: "scripts/", base: path.join(SRC_DIR, "scripts") },
  ];

  for (const entry of srcPrefixMap) {
    if (normalized.startsWith(entry.prefix)) {
      const relativePart = normalized.slice(entry.prefix.length);
      return path.join(entry.base, relativePart);
    }
  }

  return path.join(ROOT_DIR, normalized);
}

async function copyFileIfExists(fromPath, toPath) {
  if (!(await fileExists(fromPath))) {
    return false;
  }

  await fs.mkdir(path.dirname(toPath), { recursive: true });
  await fs.copyFile(fromPath, toPath);

  const fileStat = await fs.stat(toPath);
  stats.copiedFiles += 1;
  stats.copiedBytes += fileStat.size;
  return true;
}

async function copyReferencedAssets(html) {
  const refs = collectAssetReferences(html);
  const missing = [];

  for (const ref of refs) {
    const normalizedRef = ref.replace(/^\.\//, "").replace(/^\/+/, "");
    if (!normalizedRef || normalizedRef.endsWith("/")) {
      continue;
    }

    const fromPath = sourcePathFromDistReference(ref);
    const toPath = path.join(DIST_DIR, normalizedRef);

    const copied = await copyFileIfExists(fromPath, toPath);
    if (!copied) {
      missing.push({ ref, expectedSource: path.relative(ROOT_DIR, fromPath) });
    }
  }

  return missing;
}

async function recursiveFind(filename, searchDir) {
  try {
    const entries = await fs.readdir(searchDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(searchDir, entry.name);

      if (entry.isDirectory()) {
        const found = await recursiveFind(filename, fullPath);
        if (found) return found;
      } else if (entry.name === filename) {
        return fullPath;
      }
    }
  } catch (err) {
    return null;
  }

  return null;
}

async function generateIndexCSS() {
  const content = `/* Compatibility layer for Nicepage */\n@import "./styles/main.css";\n`;
  await fs.writeFile(path.join(DIST_DIR, "index.css"), content, "utf-8");
  console.log("  ✓ Generated index.css");
}

async function copyLegacyAssets() {
  console.log("\n📦 Copying legacy assets...");

  for (const [destName, sourcePath] of Object.entries(ASSET_MAP)) {
    if (sourcePath === "GENERATE_INDEX_CSS") {
      await generateIndexCSS();
      continue;
    }

    const destPath = path.join(DIST_DIR, destName);

    if (await fileExists(sourcePath)) {
      await fs.copyFile(sourcePath, destPath);
      console.log(`  ✓ Copied ${destName}`);
    } else {
      console.warn(`  ⚠ Source not found: ${sourcePath}`);
    }
  }
}

async function copyImagesFolder() {
  console.log("\n🖼️  Copying images folder...");

  const srcImagesDir = path.join(SRC_DIR, "assets/images");
  const distImagesDir = path.join(DIST_DIR, "images");

  await fs.mkdir(distImagesDir, { recursive: true });

  async function copyRecursive(src, dest) {
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await fs.mkdir(destPath, { recursive: true });
        await copyRecursive(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
        stats.copiedFiles++;
        const stat = await fs.stat(srcPath);
        stats.copiedBytes += stat.size;
      }
    }
  }

  await copyRecursive(srcImagesDir, distImagesDir);
  console.log(`  ✓ Copied images folder`);
}

async function copyIntlTelInputFolder() {
  console.log("\n📞 Copying intlTelInput folder...");

  const srcIntlDir = path.join(SRC_DIR, "vendor/intlTelInput");
  const distIntlDir = path.join(DIST_DIR, "intlTelInput");

  await fs.mkdir(distIntlDir, { recursive: true });

  async function copyRecursive(src, dest) {
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await fs.mkdir(destPath, { recursive: true });
        await copyRecursive(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  if (await fileExists(srcIntlDir)) {
    await copyRecursive(srcIntlDir, distIntlDir);
    console.log(`  ✓ Copied intlTelInput folder`);
  } else {
    console.warn(`  ⚠ Source folder not found: ${srcIntlDir}`);
  }
}

async function build() {
  const templatePath = path.join(TEMPLATES_DIR, "index.html");

  if (!(await fileExists(templatePath))) {
    throw new Error(
      `Template de entrada não encontrado: ${path.relative(ROOT_DIR, templatePath)}`,
    );
  }

  console.log("🏗️  Iniciando build...");
  console.log(`📄 Template: ${path.relative(ROOT_DIR, templatePath)}`);
  console.log(
    `⚙️  Opções: minify=${options.minify} sourcemap=${options.sourcemap}`,
  );

  await fs.mkdir(DIST_DIR, { recursive: true });
  await copyLegacyAssets();
  await copyImagesFolder();
  await copyIntlTelInputFolder();

  const sourcemapEntries = [];
  const template = await fs.readFile(templatePath, "utf8");

  let html = await parseIncludes(template, [templatePath], sourcemapEntries);
  html = rewriteAssetPaths(html);

  if (options.minify) {
    html = minifyHtml(html);
  }

  if (options.sourcemap) {
    const map = {
      version: 1,
      file: "index.html",
      sourceRoot: ".",
      sources: [path.relative(ROOT_DIR, templatePath)],
      includes: sourcemapEntries,
      generatedAt: new Date().toISOString(),
    };

    const mapOutputPath = path.join(DIST_DIR, "index.html.map");
    await fs.writeFile(mapOutputPath, JSON.stringify(map, null, 2), "utf8");
    html += `${options.minify ? "" : "\n"}<!--# sourceMappingURL=index.html.map -->`;
  }

  const missingAssets = await copyReferencedAssets(html);

  const outputPath = path.join(DIST_DIR, "index.html");
  await fs.writeFile(outputPath, html, "utf8");

  console.log(`✅ HTML gerado: ${path.relative(ROOT_DIR, outputPath)}`);
  console.log(`🧩 Includes resolvidos: ${stats.includesResolved}`);
  console.log(
    `📦 Arquivos copiados: ${stats.copiedFiles} (${stats.copiedBytes} bytes)`,
  );

  if (missingAssets.length > 0) {
    console.log("⚠️  Assets não encontrados (não copiados):");
    for (const missing of missingAssets) {
      console.log(
        `   - ${missing.ref} (esperado em ${missing.expectedSource})`,
      );
    }
  }

  console.log("🎉 Build finalizado.");
}

build().catch((error) => {
  console.error("❌ Erro no build:");
  console.error(`   ${error.message}`);
  process.exitCode = 1;
});
