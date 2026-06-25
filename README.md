# Aldrick Tadeo — portfolio

A static Astro portfolio with hand-authored Typst CVs. Website facts live in one Markdown file per item; the CV variants remain manually edited and are compiled in CI.

## Commands

```bash
npm install
npm run dev
npm run content:check
npm run check
npm run build
npm run build:cv       # requires Typst
npm run build:all      # content validation, all CVs, and Astro
```

Create a draft item:

```bash
npm run new:item -- lidar-mapping-project project
```

See `docs/item-template.md` for all fields and the CV synchronization checklist.

## Content model

- `src/content/items/*.md` — canonical projects, work, education, publications, conferences, awards, courses, certifications, volunteering, and news.
- `src/data/skills.ts` — canonical skill IDs and groups. Item-to-skill relationships are derived from each item's `skills` field.
- `src/config/site.ts` — personal introduction and public contact links.
- `cv/*.typ` — manually authored CV sources. These are never generated from website content.
- `cv/manifest.json` — CV entrypoints, PDF outputs, and public visibility.

The homepage, timeline, skill evidence, featured content, credentials, portfolio groups, and related items are generated from the item collection at build time.

## CV workflow

All three manifest variants compile in CI, including variants that are not yet shown on `/cv`. `published` controls public visibility; it does not skip compilation. Preserve and manually edit the Typst sources, then inspect their PDFs before changing a variant to public.

## Deployment

Pushes to `main` run content validation, compile every CV, build Astro, and publish the resulting static artifact to GitHub Pages.
