# Aldrick Tadeo portfolio

A static Astro portfolio with content-driven project pages, localized routes, and hand-authored Typst CVs. Website facts live in one Markdown file per item; CV variants remain manually edited and are compiled separately.

## Environment setup

Prerequisites:

- Node.js 20 or newer.
- npm, using the committed `package-lock.json`.
- Typst CLI, only required for CV PDF generation.

Install dependencies:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

Astro prints the local preview URL, usually `http://localhost:4321`.

## Commands

```bash
npm run dev            # Start Astro dev server
npm run content:check  # Validate item content, translations, assets, skills, and CV manifest
npm run check          # Run content validation and astro check
npm run build          # Validate content and build the static site
npm run build:cv       # Compile every CV manifest variant; requires Typst
npm run build:all      # Validate content, compile CVs, and build Astro
npm run preview        # Preview the built site
```

Create a draft content item:

```bash
npm run new:item -- lidar-mapping-project project
```

See `docs/item-template.md` for the full frontmatter schema and CV synchronization checklist.

## Project structure

```text
.
├── .agent/                         # Agent onboarding and Codex environment notes
├── .github/workflows/              # GitHub Actions for Pages deploy and CV builds
├── cv/                             # Hand-authored Typst CV sources and manifest
├── docs/                           # Content authoring references
├── public/                         # Static assets copied into the built site
├── scripts/                        # Content validation, item scaffolding, CV build helpers
├── src/
│   ├── assets/icons/               # Skill and UI icons imported by components
│   ├── components/                 # Astro page sections and reusable UI
│   ├── config/                     # Site-level configuration
│   ├── content/items/              # Canonical item Markdown
│   ├── content/item-translations/  # Spanish and Japanese localized item text
│   ├── data/                       # Profile, CV, and skill data
│   ├── layouts/                    # Shared Astro document layout
│   ├── lib/                        # Item and i18n helper functions
│   ├── pages/                      # Canonical routes
│   ├── pages/[lang]/               # Localized routes
│   └── styles/                     # Global CSS
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Content model

- `src/content/items/*.md` contains canonical projects, work, education, publications, conferences, awards, courses, certifications, volunteering, and news.
- `src/content/item-translations/{es,ja}/*.md` contains localized item titles, summaries, highlights, tags, link labels, and body copy. Missing translations fall back to English.
- `src/data/skills.ts` defines canonical skill IDs and groups. Item-to-skill relationships are derived from each item's `skills` field.
- `src/config/site.ts` defines the public site URL, personal introduction, and contact links.
- `cv/*.typ` contains manually authored CV sources. These are never generated from website content.
- `cv/manifest.json` defines CV entrypoints, PDF outputs, labels, defaults, and public visibility.

The homepage, timeline, skill evidence, featured content, credentials, portfolio groups, and related items are generated from the item collection at build time.

## CV workflow

All manifest variants compile in CI, including variants that are not yet shown on `/cv`. `published` controls public visibility; it does not skip compilation. Preserve and manually edit the Typst sources, then inspect generated PDFs before changing a variant to public.

## Agent documentation

Agent onboarding lives in `.agent/`:

- `.agent/Agent.md` - primary agent instructions and quality bar.
- `.agent/project-map.md` - repository layout and data flow.
- `.agent/workflows.md` - task-specific workflows for content, localization, skills, CVs, UI, and deployment.
- `.agent/codex-environment.md` - exact Codex Environment setup, cleanup, and action field contents.

## Deployment

Pushes to `main` run content validation, compile every CV, build Astro, and publish the resulting static artifact to GitHub Pages.
