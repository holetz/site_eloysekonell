# Testing Patterns
> Last mapped: 2026-05-12

## Testing Frameworks

**No automated test framework is installed.** The `package.json` contains no testing dependencies:

```json
{
  "dependencies": {
    "@astrojs/sitemap": "^3.7.2",
    "astro": "^4.16.18",
    "remark-directive": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.1"
  }
}
```

No `jest.config.*`, `vitest.config.*`, `playwright.config.*`, or `cypress.config.*` files exist in the repository.

---

## Test File Locations

**None.** There are zero test files (`*.test.*`, `*.spec.*`) anywhere in the repository.

---

## Build as Validation Gate

`npm run build` (`astro build`) is the sole automated quality check. It provides:

1. **TypeScript type checking** — `tsconfig.json` extends `astro/tsconfigs/strictest`. Any type error in `.astro` frontmatter or `.ts` files fails the build.

2. **Content collection schema validation** — Zod schemas in `src/content/config.ts` are evaluated at build time. A blog post missing a required field (e.g., `readingTime`) or a case missing `client`/`sector`/`problem`/`approach`/`result` will throw and abort the build.

3. **Route generation** — Dynamic routes (`src/pages/blog/[...slug].astro`, `src/pages/cases/[slug].astro`) are statically generated. A broken `getStaticPaths()` or collection query failure surfaces here.

4. **Import resolution** — Broken imports (missing asset files, wrong paths) are caught during Vite bundling.

5. **Output verification** — Build writes to `docs/`. A successful build confirms the site is deployable.

**Run build locally:**
```bash
npm run build
```

**Preview the built output:**
```bash
npm run preview
```

---

## CI Pipeline

The GitHub Actions workflow at `.github/workflows/deploy.yml` runs on every push to `main`:

```yaml
- name: Install dependencies
  run: npm ci

- name: Build Astro
  run: npm run build
```

A build failure blocks deployment. There is **no separate test step, no type-check step, and no lint step** in CI beyond the build itself.

The pipeline does not run on pull requests to non-`main` branches — there is no pre-merge validation gate.

---

## Type Checking

TypeScript strict mode is active (`astro/tsconfigs/strictest`). Type errors surface at build time. There is no standalone `tsc --noEmit` step in `package.json` scripts or CI.

To run type checking without a full build:
```bash
npx astro check
```
(This command exists in the Astro CLI but is not wired into any `npm run` script in `package.json`.)

---

## Coverage

**No coverage tooling.** No Istanbul, c8, or equivalent is configured.

---

## What Is Implicitly Verified by the Build

| Concern | Verified by build? |
|---|---|
| TypeScript types in `.astro` and `.ts` | Yes — strict mode |
| Content collection frontmatter shape | Yes — Zod at build time |
| Broken internal imports/assets | Yes — Vite bundler |
| Static route generation | Yes — `getStaticPaths` runs |
| Sitemap XML generation | Yes — `src/pages/sitemap.xml.ts` executes |
| JSON-LD schema object shape | No — runtime JS objects, not typed against a schema |
| HTML output correctness | No |
| Accessibility compliance | No |
| Visual regression | No |
| JavaScript interactivity (nav, tabs, FAQ) | No |
| Cross-browser rendering | No |

---

## Notable Gaps

**No unit tests for the remark plugin.** `remark-blog-directives.mjs` contains five custom directive transformers. Breakage would only be detected by manually previewing blog posts that use `::pullquote`, `:::data-grid`, `:::inline-cta`, `:::faq`, or `:::exercise` directives.

**No integration/e2e tests.** Interactive components (mobile nav, tab widget in `AssessmentSpotlight`, FAQ accordion in `FaqBlock`, copy-link button in `BlogLayout`) have no automated coverage. Their JavaScript correctness depends entirely on manual review.

**No accessibility audit automation.** ARIA patterns are implemented by convention (see `CONVENTIONS.md`). No axe-core, pa11y, or Lighthouse CI runs in the pipeline.

**No visual regression.** Design token usage and layout correctness are verified only by human inspection.

**No pre-merge CI.** The CI pipeline only triggers on push to `main`. There is no branch protection or PR check gate.

**Draft flag is the only content gate.** Case studies (`draft: true` by default) and blog posts rely on the `draft` boolean being set correctly. A post published accidentally (wrong `draft: false`) would be discovered only by visiting the live site.

---

## Recommended Testing Additions (if prioritised)

If a test layer is added, the highest-value targets in order are:

1. **`astro check` as a CI step** — `npx astro check` catches type errors and collection schema issues without a full build. Fast feedback on PRs.
2. **Unit tests for `remark-blog-directives.mjs`** — Vitest would be the natural choice given the Vite/Astro stack. Test each directive transformer with fixture Markdown input.
3. **Playwright e2e smoke tests** — Verify nav toggle, FAQ accordion, and tab widget work after build.
4. **Axe accessibility checks** — Integrate `@axe-core/playwright` into e2e suite.
