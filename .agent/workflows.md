# Agent workflows

## Fresh worktree

1. Confirm the worktree status with `git status --short`.
2. Install dependencies with `npm ci`.
3. Run `npm run content:check` to verify content, translations, skills, assets, and CV manifest consistency.
4. Start development with `npm run dev` when visual inspection is needed.

## Add or update an item

1. Create a draft with `npm run new:item -- <kebab-case-slug> <type>` or edit an existing file in `src/content/items/`.
2. Use the schema in `docs/item-template.md`.
3. Keep `published: false` until the body, links, dates, assets, and translations are ready.
4. Use skill IDs from `src/data/skills.ts`.
5. Ensure relation IDs point to existing canonical item slugs.
6. Add localized text under `src/content/item-translations/es/` and `src/content/item-translations/ja/` when the item is public or when the owner asks for localization.
7. Run `npm run content:check`.

## Update translations

1. Match translation filenames to canonical item slugs exactly.
2. Include only localized `title`, `summary`, `highlights`, `tags`, optional link labels, and body copy.
3. Do not duplicate canonical metadata in translation files.
4. Run `npm run content:check`.

## Update skills

1. Edit `src/data/skills.ts`.
2. Keep IDs stable because item frontmatter references them.
3. Add an SVG icon under `src/assets/icons/skills/` only when the UI needs it and the asset is available.
4. Run `npm run content:check` and `npm run check`.

## Update CVs

1. Edit the relevant `cv/*.typ` file manually.
2. Update `cv/manifest.json` only when adding, removing, renaming, publishing, or changing a CV variant.
3. Run `npm run content:check`.
4. Run `npm run build:cv` if Typst is installed.
5. Inspect generated PDFs under `public/cv/` before making a variant public.

## Update UI or routes

1. Prefer existing component and CSS patterns.
2. Keep localized routes in sync with canonical routes where behavior should match.
3. Run `npm run check`.
4. Run `npm run build`.

## Deployment expectations

Pushes to `main` run content validation, compile all CV variants, build Astro, and deploy `dist/` to GitHub Pages. The `build-cv` workflow also compiles all CV variants when `cv/**` changes.
