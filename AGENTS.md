# Repository Guidelines

## Project Structure & Module Organization

This is a static Astro portfolio. Route entrypoints live in `src/pages/`, with localized routes mirrored under `src/pages/[lang]/`. Reusable page sections and UI live in `src/components/`, shared layout in `src/layouts/BaseLayout.astro`, and global styling in `src/styles/global.css`.

Canonical portfolio facts are Markdown files in `src/content/items/`. Localized item text belongs in `src/content/item-translations/es/` and `src/content/item-translations/ja/`; keep canonical metadata such as dates, skills, links, relations, publication flags, and assets in the English item only. Static public files go in `public/`, imported icons in `src/assets/icons/`, and hand-authored Typst CV sources in `cv/`.

## Build, Test, and Development Commands

- `npm ci`: install the exact dependency graph from `package-lock.json`.
- `npm run dev`: start the Astro dev server, usually on `http://localhost:4321`.
- `npm run content:check`: validate content frontmatter, translations, assets, skill IDs, relations, and the CV manifest.
- `npm run check`: run content validation plus `astro check`.
- `npm run build`: validate content and build the static site into `dist/`.
- `npm run build:cv`: compile CV PDFs from `cv/manifest.json`; requires Typst.
- `npm run new:item -- <slug> <type>`: scaffold a draft item, for example `npm run new:item -- lidar-mapping-project project`.

## Coding Style & Naming Conventions

Use TypeScript, Astro components, and CSS patterns already present in the repository. Prefer two-space indentation in Astro, TypeScript, JSON, and Markdown frontmatter. Use lowercase kebab-case for item filenames, slugs, and relation IDs. Keep skill IDs stable because content frontmatter references `src/data/skills.ts`.

## Testing Guidelines

There is no separate unit test suite. Treat `npm run content:check`, `npm run check`, and `npm run build` as the required validation path for code or public content changes. Run `npm run build:cv` when `cv/*.typ` or `cv/manifest.json` changes and Typst is installed.

## Commit & Pull Request Guidelines

Recent commits use short imperative subjects, for example `Handle missing item arrays across content rendering` or `Add portfolio gallery thumbnails and media validation`. Keep commits focused. Pull requests should describe the change, list validation commands run, link related issues when applicable, and include screenshots or generated PDF notes for visible UI or CV changes.

## Agent-Specific Instructions

Read `.agent/Agent.md`, `.agent/project-map.md`, and `.agent/workflows.md` before editing. Preserve existing user changes. Ask precise planning questions when scope is ambiguous, ideally with a suggested answer.
