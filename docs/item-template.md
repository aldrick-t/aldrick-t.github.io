# Item template

Use this file as the frontmatter reference for canonical portfolio items under `src/content/items/`.
The Markdown filename is the item slug, so use a lowercase kebab-case filename such as
`src/content/items/project/my-item.md`. The folder helps organize content, but the slug is
`my-item`.

To scaffold a new draft, run:

```sh
npm run new:item -- my-item project
```

## Full frontmatter example

Copy this example, then remove fields that do not apply. Required fields are noted in the
parameter sections below.

```yaml
---
title: "Item title"
type: "project"
summary: "One concise, factual summary."
organization: "Optional organization"
location: "Optional location"
dateStart: "2026-01"
dateEnd: "Present"
highlights:
  - "A concrete contribution or result."
skills: ["ros2", "python"]
tags: ["Robotics"]
published: false
portfolio: true
featuredRank: 1
relevanceRank: 1
links:
  - kind: "site"
    label: "Project website"
    url: "https://example.com"
  - kind: "repository"
    label: "Source code"
    url: "https://github.com/example/project"
  - kind: "file"
    label: "Local report"
    url: "/items/my-item/report.pdf"
    icon: "publication"
assets: []
thumbnail:
  path: "/items/my-item/thumbnail.webp"
  alt: "Short description of the thumbnail image."
  objectFit: "cover"
  objectPosition: "50% 50%"
  backgroundColor: "#ffffff"
  aspectRatio: "16 / 10"
media:
  - kind: "image"
    path: "/items/my-item/detail.webp"
    alt: "Short description of the detail image."
    caption: "Optional caption."
  - kind: "youtube"
    url: "https://www.youtube.com/watch?v=exampleid12"
    title: "Video title for accessibility"
    caption: "Optional caption."
  - kind: "video"
    path: "/items/my-item/demo.mp4"
    title: "Local demo video"
    caption: "Optional caption."
    poster:
      path: "/items/my-item/demo-poster.webp"
      alt: "Short description of the video poster."
  - kind: "pdf"
    path: "/items/my-item/report.pdf"
    title: "Report title"
    caption: "Optional caption."
  - kind: "pdf"
    url: "https://example.com/report.pdf"
    title: "External report title"
    thumbnail:
      path: "/items/my-item/external-report-thumbnail.webp"
      alt: "Short description of the external report thumbnail."
  - kind: "file"
    path: "/items/my-item/source-data.zip"
    title: "Source data archive"
    caption: "Optional caption."
collaborators:
  - name: "Jane Doe"
    url: "https://www.linkedin.com/in/janedoe"
  - name: "John Smith"
    url: "mailto:john@example.com"
  - name: "Research Lab Partner"
relations:
  - id: "another-item-slug"
    label: "Related project"
relatedFallback: "skills"
cvReview: ["engineering", "academic", "full"]
---
```

Write the complete item narrative after the frontmatter. Published items require body content.

## Required identity fields

| Parameter | Required | Options or format | Description |
| --- | --- | --- | --- |
| `title` | Yes | Non-empty string | Display title used on cards, item pages, metadata, and localized fallbacks. |
| `type` | Yes | `project`, `work`, `education`, `publication`, `conference`, `award`, `course`, `certification`, `volunteering` | Primary item category. This controls grouping, labels, and baseline gallery relevance. News records use the dedicated News template. |
| `summary` | Yes | Non-empty string | Short factual description for cards and metadata. Keep it reusable and concise. |
| `organization` | No | String | Company, school, lab, publisher, event, or issuing organization. |
| `location` | No | String | City, region, remote, event location, or other location text. |
| `dateStart` | Yes | `YYYY` or `YYYY-MM` | Start date. Month precision is preferred when known. |
| `dateEnd` | Yes | `YYYY`, `YYYY-MM`, or `Present` | End date. Must not be earlier than `dateStart`. Use `Present` for ongoing work. |

## Classification fields

| Parameter | Required | Default | Description |
| --- | --- | --- | --- |
| `highlights` | No | `[]` | Short result-oriented bullets used on item pages. Prefer concrete outcomes over responsibilities. |
| `skills` | No | `[]` | Skill IDs from `src/data/skills.ts`. Validation rejects unknown IDs. |
| `tags` | No | `[]` | Freeform display tags. Portfolio Gallery cards show the first three. Translation files may localize tags. |

Example:

```yaml
highlights:
  - "Built a ROS 2 perception pipeline for greenhouse fruit detection."
skills: ["ros2", "python", "opencv"]
tags: ["Robotics", "Computer vision"]
```

## Visibility and ordering

| Parameter | Required | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `published` | No | `true` | `true` or `false` | Set `false` for drafts. Published items require body content and can appear in public pages. |
| `portfolio` | No | `true` | `true` or `false` | Controls whether the item appears in portfolio listing pages and adjacent item pagination. |
| `featuredRank` | No | None | `1`, `2`, or `3` | Homepage feature order. Exactly three published items must have unique featured ranks. Omit this for non-featured items. |
| `relevanceRank` | No | None | Positive integer | Manual Portfolio Gallery relevance order. Lower numbers appear first. Published portfolio items must not share the same rank. |

If `relevanceRank` is omitted, gallery relevance falls back to featured rank, item type, media
availability, recency, and title. Use `relevanceRank` sparingly for intentional manual curation.

## File paths and asset placement

Store item-specific public files under `public/items/<item-slug>/`, then reference them with
public paths:

```yaml
thumbnail:
  path: "/items/my-item/thumbnail.webp"
```

Recommended names:

- `public/items/<item-slug>/thumbnail.webp` for the Portfolio Gallery card thumbnail.
- `public/items/<item-slug>/prototype-test.webp` for supporting images.
- `public/items/<item-slug>/demo.mp4` or `.webm` for local video.
- `public/items/<item-slug>/report.pdf` for local PDFs.
- `public/items/<item-slug>/source-data.zip` for downloadable files.

Validation rejects missing local paths and most media paths outside `/items/<item-slug>/`.

## Thumbnail

`thumbnail` controls the Portfolio Gallery card image. It does not create an item-detail media
card; add the same image to `media` if it should also appear in the Media section.

| Parameter | Required | Options or format | Description |
| --- | --- | --- | --- |
| `thumbnail.path` | Yes, when `thumbnail` exists | Local `/items/<slug>/...` path | Image shown on gallery cards. Prefer `.webp`, `.png`, `.jpg`, `.jpeg`, `.gif`, or `.avif`. |
| `thumbnail.alt` | Yes, when `thumbnail` exists | Non-empty string | Accessible description of the image content. |
| `thumbnail.objectFit` | No | `cover`, `contain`, `fill`, `scale-down` | Maps to CSS `object-fit`. Omit for default cropped `cover` behavior. |
| `thumbnail.objectPosition` | No | CSS position string | Maps to CSS `object-position`, such as `"50% 50%"`, `"0% 50%"`, or `"100% 50%"`. |
| `thumbnail.backgroundColor` | No | Six-digit hex color, such as `#ffffff` | Card media background, most useful with `contain` or `scale-down`. |
| `thumbnail.aspectRatio` | No | Numeric ratio, such as `16 / 10` | Overrides the card media frame. Reserve for thumbnails that need a non-default shape. |

Common thumbnail setups:

```yaml
thumbnail:
  path: "/items/my-item/thumbnail.webp"
  alt: "Robot arm aligning a gripper over a test plant."
  objectFit: "cover"
  objectPosition: "50% 50%"
```

```yaml
thumbnail:
  path: "/items/my-item/certificate.png"
  alt: "Certificate preview."
  objectFit: "contain"
  backgroundColor: "#ffffff"
```

## Links

`links` appear in the item header. The first two links also appear on Portfolio Gallery cards.
Every link needs `kind`, `label`, and `url`.

| Parameter | Required | Options or format | Description |
| --- | --- | --- | --- |
| `links[].kind` | Yes | `site`, `repository`, `publication`, `credential`, `video`, `file`, `other` | Link category and default icon source. |
| `links[].label` | Yes | Non-empty string | User-facing link text. Translation files can localize link labels by position. |
| `links[].url` | Yes | `http(s)` URL or local `/items/<slug>/...` path | Destination. Local files must exist under the matching item folder. |
| `links[].icon` | No | `site`, `github`, `publication`, `credential`, `video`, `file`, `external`, `other` | Optional icon override when the default for `kind` is misleading. |

Supported link kinds:

- `site`: project, organization, product, or event website.
- `repository`: source repository. Uses the GitHub icon by default.
- `publication`: paper, article, proceedings entry, or report page.
- `credential`: certificate, credential, badge, or verification page.
- `video`: external video link. Supported YouTube URLs are also mirrored into the Media section.
- `file`: local or remote file link, such as a PDF, ZIP, dataset, or slide deck.
- `other`: any other supporting destination.

Examples:

```yaml
links:
  - kind: "repository"
    label: "GitHub repository"
    url: "https://github.com/example/project"
```

```yaml
links:
  - kind: "file"
    label: "Open local report"
    url: "/items/my-item/report.pdf"
    icon: "publication"
```

## Legacy assets

`assets` is a legacy image list that still renders in the item-detail Media section. Prefer
`thumbnail` for gallery card images and `media` for new item-detail media.

| Parameter | Required | Description |
| --- | --- | --- |
| `assets[].path` | Yes | Image path. Existing entries may be public paths or relative paths; new entries should use `/items/<slug>/...`. |
| `assets[].alt` | Yes | Accessible image description. |
| `assets[].caption` | No | Optional figure caption. |
| `assets[].credit` | No | Optional credit text. |

Use `assets: []` when there are no legacy images.

## Media

`media` controls the item-detail Media section. Supported `kind` values are `image`, `youtube`,
`video`, `pdf`, and `file`.

### Image media

Use for supporting photos, diagrams, screenshots, and other images.

| Parameter | Required | Description |
| --- | --- | --- |
| `kind` | Yes | Must be `image`. |
| `path` | Yes | Local `/items/<slug>/...` image path. |
| `alt` | Yes | Accessible image description. |
| `caption` | No | Optional figure caption. |
| `credit` | No | Optional credit text. |

```yaml
media:
  - kind: "image"
    path: "/items/my-item/prototype-test.webp"
    alt: "Prototype gripper holding a tomato during bench testing."
    caption: "Bench test of the soft gripper prototype."
```

### YouTube media

Use for embedded YouTube videos. Supported URL shapes are `youtube.com/watch?v=...`,
`youtube.com/embed/...`, `youtube.com/shorts/...`, `m.youtube.com/watch?v=...`, and `youtu.be/...`.
The video ID must be the standard 11-character YouTube ID.

| Parameter | Required | Description |
| --- | --- | --- |
| `kind` | Yes | Must be `youtube`. |
| `url` | Yes | Supported YouTube URL. |
| `title` | Yes | Accessible iframe title. |
| `caption` | No | Optional caption shown below the video. |

### Local video media

Use for browser-playable local videos.

| Parameter | Required | Options or format | Description |
| --- | --- | --- | --- |
| `kind` | Yes | `video` | Local video media. |
| `path` | Yes | `/items/<slug>/...` ending in `.mp4` or `.webm` | Video source. |
| `title` | Yes | Non-empty string | Accessible title. |
| `caption` | No | String | Optional caption. |
| `poster.path` | No | Local image path | Poster image shown before playback. |
| `poster.alt` | Required when `poster` exists | Non-empty string | Poster image alt text. |

### PDF media

Use for reports, papers, posters, and slide exports that should appear as PDF media cards.

| Parameter | Required | Options or format | Description |
| --- | --- | --- | --- |
| `kind` | Yes | `pdf` | PDF media card. |
| `path` | Yes, unless `url` is used | Local `/items/<slug>/...` path ending in `.pdf` | Local PDF source. |
| `url` | Yes, unless `path` is used | Remote `http(s)` URL | Remote PDF source. |
| `title` | Yes | Non-empty string | Card title and accessible link label. |
| `caption` | No | String | Optional caption. |
| `thumbnail.path` | No | Local image path | Manual preview image. |
| `thumbnail.alt` | Required when `thumbnail` exists | Non-empty string | Preview image alt text. |

PDF media must use exactly one of `path` or `url`, never both. When a local PDF omits
`thumbnail`, `npm run media:thumbnails` generates a first-page preview at
`/items/<slug>/generated/<pdf-basename>-page-1.png`. Generated thumbnail PNGs are ignored by Git.
Remote PDFs are not fetched during builds, so add a local `thumbnail` when a remote PDF needs a
real preview image.

### Generic file media

Use for non-PDF files that should appear as media cards, such as archives, datasets, source data,
notebooks, or slide decks.

| Parameter | Required | Description |
| --- | --- | --- |
| `kind` | Yes | Must be `file`. |
| `path` | Yes | Local `/items/<slug>/...` file path. |
| `title` | Yes | Card title and accessible link label. |
| `caption` | No | Optional caption. |
| `thumbnail.path` | No | Optional local image preview. |
| `thumbnail.alt` | Required when `thumbnail` exists | Preview image alt text. |

Generic file media and local file links do not generate thumbnails. Without a manual thumbnail,
the site renders a fallback card with the file extension badge.

## Collaborators

Use `collaborators` to credit people or organizations that worked on an item.

| Parameter | Required | Description |
| --- | --- | --- |
| `collaborators[].name` | Yes | Person, team, lab, company, or partner name. |
| `collaborators[].url` | No | Optional URL, including websites, LinkedIn, GitHub, Google Scholar, or `mailto:` links. |

Collaborators are canonical metadata. Do not duplicate them in translation files.

## Relations

Use `relations` and `relatedFallback` to control related items on item pages.

| Parameter | Required | Options or format | Description |
| --- | --- | --- | --- |
| `relations[].id` | Yes, when `relations` exists | Existing item slug | Explicit related item. Validation rejects self-relations, duplicate relations, and missing item slugs. |
| `relations[].label` | Yes, when `relations` exists | Non-empty string | Relationship label for authoring context. |
| `relatedFallback` | No | `skills` | When set to `skills`, the page fills remaining related-item slots with published items sharing skill IDs. Omit to show only explicit relations. |

Relation IDs use item filename slugs, not folder paths.

## CV review

`cvReview` marks which hand-authored CV variants should be reviewed after the item changes.

| Parameter | Required | Options | Description |
| --- | --- | --- | --- |
| `cvReview` | No | `engineering`, `academic`, `full` | Array of CV variants to manually review. Defaults to `[]`. |

The website item is the factual reference, but CV files under `cv/` are not generated from item
Markdown.

## Translations

Localized display text belongs under:

- `src/content/item-translations/es/<slug>.md`
- `src/content/item-translations/ja/<slug>.md`

Translation filenames must match canonical item slugs exactly. Missing translations fall back to
English.

```yaml
---
title: "Localized title"
summary: "Localized concise summary."
highlights:
  - "Localized highlight."
tags: ["Localized tag"]
links:
  - label: "Localized label for the first canonical link"
---
```

Translation files may contain only localized `title`, `summary`, `highlights`, `tags`, link
labels, and body copy. Do not duplicate dates, skills, publication flags, collaborators,
relations, thumbnails, media, assets, or CV metadata in translation files.

## Validation checklist

Run `npm run content:check` after content, media, translation, skill, asset, or CV manifest changes.
Run `npm run check` when changing Astro, TypeScript, schemas, or shared rendering behavior.

Content validation checks include:

- Item filenames are lowercase kebab-case and unique across `src/content/items`.
- Required frontmatter fields exist and dates are valid.
- Published items and published item translations include body content.
- Skill IDs exist in `src/data/skills.ts`.
- Local item links, thumbnails, media, posters, and file media exist under the matching item folder.
- Link kinds, link icons, thumbnail settings, media kinds, video extensions, and YouTube URLs are supported.
- PDF media uses exactly one of `path` or `url`.
- Featured ranks and published portfolio relevance ranks are unique.
- Relations point to existing items and do not point to the same item.
- Translation files match canonical item slugs and do not define more link labels than canonical links.

## CV synchronization

When item facts affect a CV:

1. Update the canonical item.
2. Review each variant listed in `cvReview`.
3. Manually adapt wording and bullet length in the relevant `cv/*.typ` files.
4. Run `npm run build:cv` when Typst is installed.
5. Visually inspect generated PDFs under `public/cv/` before publishing CV changes.
