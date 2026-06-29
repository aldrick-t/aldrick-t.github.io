# Project map

## Runtime and tooling

- Framework: Astro 7 static site.
- Language: TypeScript, Astro components, Markdown content collections.
- Package manager: npm with `package-lock.json`.
- CV tooling: Typst CLI for PDF compilation.
- Deployment: GitHub Actions to GitHub Pages.

## Important paths

- `src/pages/` - route entrypoints for English pages and canonical item routes.
- `src/pages/[lang]/` - localized route entrypoints.
- `src/components/` - page sections and reusable UI components.
- `src/layouts/BaseLayout.astro` - shared document shell, metadata, navigation, and page chrome.
- `src/styles/global.css` - global design tokens and component styling.
- `src/content.config.ts` - Astro content collection schemas for canonical items and translations.
- `src/content/items/*.md` - canonical portfolio, career, education, award, course, publication, volunteering, and news records.
- `src/content/item-translations/es/*.md` - Spanish localized item text.
- `src/content/item-translations/ja/*.md` - Japanese localized item text.
- `src/lib/items.ts` - canonical item helpers.
- `src/lib/localized-items.ts` - localized item helpers and fallback behavior.
- `src/lib/i18n.ts` - locale definitions and translated UI strings.
- `src/data/skills.ts` - canonical skill IDs and display metadata.
- `src/data/profile.ts` - profile data used by pages and components.
- `src/data/cv.ts` - CV display data derived from the CV manifest.
- `src/config/site.ts` - public site URL, profile introduction, and contact links.
- `cv/*.typ` - manually authored Typst CV sources.
- `cv/manifest.json` - CV variants, output PDFs, labels, defaults, and publication flags.
- `public/` - static assets copied directly into the built site.
- `public/cv/` - generated CV PDFs.
- `scripts/validate-content.mjs` - repository-specific content and manifest validation.
- `scripts/build-cvs.mjs` - Typst build wrapper for every CV manifest variant.
- `scripts/new-item.mjs` - draft item scaffold helper.
- `docs/item-template.md` - content frontmatter reference and CV synchronization checklist.
- `docs/asset-needs.md` - outstanding asset notes.
- `.github/workflows/deploy.yml` - GitHub Pages build and deploy workflow.
- `.github/workflows/build-cv.yml` - CV-only workflow.

## Content flow

Canonical item Markdown feeds the homepage, portfolio, item detail pages, skill evidence, timeline, related items, and localized pages. Translation Markdown only overrides display text and body copy; canonical dates, skills, links, relations, publication flags, and assets stay in the English item file.

CV files do not derive from Markdown at build time. The website content is the factual reference, but the Typst sources must be edited manually and reviewed as PDFs.
