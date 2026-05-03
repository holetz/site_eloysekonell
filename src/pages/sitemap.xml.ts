import { getCollection } from 'astro:content';

const SITE = 'https://eloysekonell.com.br';
const BUILD_DATE = new Date().toISOString().split('T')[0];

// Auto-detect static routes via import.meta.glob (Vite/Astro)
// Keys are relative to this file (src/pages/sitemap.xml.ts),
// so sibling files appear as e.g. "./index.astro", "./blog/index.astro"
const pageModules = import.meta.glob('./**/*.astro');

function pathToUrl(modulePath: string): string | null {
  // Strip leading './'
  let rel = modulePath.replace(/^\.\//, '/');

  // Exclude dynamic routes (contain '[')
  if (rel.includes('[')) return null;

  // Exclude 404
  if (rel.includes('404')) return null;

  // Exclude sitemap itself
  if (rel.includes('sitemap')) return null;

  // Exclude root index.astro (handled separately as '/')
  if (rel === '/index.astro') return null;

  // Strip .astro extension
  rel = rel.replace(/\.astro$/, '');

  // /blog/index → /blog/
  // /servicos/index → /servicos/
  rel = rel.replace(/\/index$/, '/');

  // /sobre → /sobre/
  if (!rel.endsWith('/')) rel += '/';

  return rel;
}

function getStaticPageEntry(url: string) {
  const isRoot = url === '/';
  const isBlogIndex = url === '/blog/';
  return {
    url,
    priority: isRoot ? '1.0' : isBlogIndex ? '0.8' : '0.7',
    changefreq: isRoot || isBlogIndex ? 'weekly' : 'monthly',
    lastmod: BUILD_DATE,
  };
}

export async function GET() {
  // Home always first
  const staticEntries = [getStaticPageEntry('/')];

  // Collect auto-detected static routes
  const detectedUrls: string[] = [];
  for (const modulePath of Object.keys(pageModules)) {
    const url = pathToUrl(modulePath);
    if (url) detectedUrls.push(url);
  }
  // Sort for deterministic output
  detectedUrls.sort();
  for (const url of detectedUrls) {
    staticEntries.push(getStaticPageEntry(url));
  }

  // Blog posts
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const postEntries = posts.map((post) => ({
    url: `/blog/${post.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString().split('T')[0],
  }));

  // Cases (collection created in task 16 — tolerate absence)
  let caseEntries: { url: string; priority: string; changefreq: string; lastmod: string }[] = [];
  try {
    const cases = await getCollection('cases' as any, ({ data }: any) => !data.draft);
    caseEntries = cases.map((c: any) => ({
      url: `/cases/${c.slug}/`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: (c.data.updatedDate ?? c.data.pubDate).toISOString().split('T')[0],
    }));
  } catch {
    // Collection 'cases' not yet defined — skip silently
  }

  const allPages = [...staticEntries, ...postEntries, ...caseEntries];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${page.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
