# Agent guide

This repository is a static Astro portfolio for Aldrick Tadeo. Treat `src/content/items/*.md` as the canonical source for portfolio facts, keep localized content in the translation collection, and keep Typst CV sources manually authored.

## Start here

1. Read this file before editing.
2. Read `.agent/project-map.md` for the repository layout.
3. Read `.agent/workflows.md` before changing content, CV files, localization, or deployment behavior.
4. Read `.agent/codex-environment.md` when configuring or debugging Codex worktree setup.

## Working rules

- Use `npm ci` for repeatable installs in fresh worktrees.
- Run `npm run content:check` after content, translation, skill, asset, or CV manifest changes.
- Run `npm run check` after Astro, TypeScript, content model, or component changes.
- Run `npm run build` before finishing changes that affect the generated site.
- Run `npm run build:cv` only when Typst is installed and CV sources or `cv/manifest.json` changed.
- Do not generate CV content from website content. The CV files in `cv/*.typ` are hand-edited and must stay that way.
- Do not add translation-only metadata such as dates, skills, relation IDs, publication flags, or asset metadata to localized item files.
- Preserve existing user changes in the worktree. If a file is already modified, inspect it before editing and avoid reverting unrelated changes.

## Planning questions

Ask precise questions when the requested change is ambiguous. Include a suggested answer when possible so the owner can respond quickly.

- Content scope: "Should this item appear on the portfolio, timeline, homepage features, CV review queue, or all of them? Suggested response: portfolio and timeline only."
- Localization scope: "Should I add Spanish and Japanese translations now, or leave the new item English-only with fallback behavior? Suggested response: add both translations if the item is public."
- CV scope: "Which CV variants should be reviewed for this change: engineering, academic, full, or none? Suggested response: engineering and full for project/work updates."
- Asset scope: "Are the referenced images already available under `public/`, or should I leave `assets: []` until final media is supplied? Suggested response: leave empty until approved images are added."
- Release scope: "Should I stop at validation, or also run the full static build? Suggested response: run `npm run check` and `npm run build` for code or public content changes."

## Quality bar

- Keep item summaries concise, factual, and reusable across cards and metadata.
- Prefer concrete outcomes in `highlights` over responsibilities.
- Use lowercase kebab-case slugs for item filenames and relation IDs.
- Keep public links valid absolute URLs.
- Give every asset useful alt text.
- Keep UI changes consistent with the existing restrained portfolio style in `src/styles/global.css`.
