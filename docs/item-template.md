# Item template

Use `npm run new:item -- my-item project` to create a draft at `src/content/items/project/my-item.md`, or copy this frontmatter into a new lowercase kebab-case file anywhere under `src/content/items/`.

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
timeline: true
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
cvReview: ["engineering", "academic", "full"]
---
```

Write the complete item narrative after the frontmatter. Remove `featuredRank` unless the item is one of the three homepage features.

Use `relevanceRank` only when manually curating Portfolio Gallery relevance. Lower numbers appear first. Omit `relevanceRank` to let the baseline relevance sort use featured rank, item type, media availability, recency, and title.

Store gallery thumbnails and media under `public/items/<item-slug>/`. Use `/items/<item-slug>/thumbnail.webp` for the main card image and descriptive names such as `/items/<item-slug>/prototype-test.webp` for supporting media. Content validation rejects missing thumbnail/media paths, empty alt/title text, duplicate published relevance ranks, unsupported YouTube URLs, and invalid PDF media sources.

## Links

Item links appear in the item header and, for the first two links, Portfolio Gallery cards. The `kind` field is the link type.

Supported link `kind` values:

- `site`: project, organization, or product website. Uses the `site` icon by default.
- `repository`: source repository. Uses the GitHub icon by default.
- `publication`: paper, article, proceedings entry, or report page.
- `credential`: certificate, credential, badge, or verification page.
- `video`: external video link. Supported YouTube URLs are also mirrored into the Media section.
- `file`: local or remote file link, such as a PDF, ZIP, dataset, or slide deck.
- `other`: any other supporting destination.

Use `url` for every link. Remote links must use `http` or `https`. Local file links must live under the matching item folder in `public/items/<item-slug>/` and use a public path such as `/items/my-item/report.pdf`; they open in a new tab like PDF media.

Every link gets a default icon from its `kind`. Override it with `icon` only when the default is misleading. Supported icon keys are `site`, `github`, `publication`, `credential`, `video`, `file`, `external`, and `other`.

```yaml
links:
  - kind: "file"
    label: "Open local report"
    url: "/items/my-item/report.pdf"
    icon: "publication"
```

```yaml
links:
  - kind: "repository"
    label: "GitHub repository"
    url: "https://github.com/example/project"
```

## Media

The Media section supports `image`, `youtube`, `video`, `pdf`, and `file` entries.

- `image` requires `path` and `alt`; optional `caption` and `credit`.
- `youtube` requires a supported YouTube `url` and accessible `title`; optional `caption`.
- `video` requires a local `path` and `title`; optional `caption` and `poster`. Local videos must live under `/items/<item-slug>/` and use a browser-playable `.mp4` or `.webm` file.
- `pdf` supports exactly one of local `path` or remote `url`, plus `title`; optional `caption` and `thumbnail`.
- `file` requires local `path` and `title`; optional `caption` and `thumbnail`. Use this for non-PDF documents, archives, datasets, slide decks, and other files that should appear as media cards.

PDF media supports either a local `path` or a remote `url`, never both. Local PDFs must live under `public/items/<item-slug>/` and should use a `.pdf` extension. When a local PDF omits `thumbnail`, `npm run media:thumbnails` generates the first-page preview at `/items/<item-slug>/generated/<pdf-basename>-page-1.png`; these generated PNGs are ignored by Git. Remote PDFs are not fetched during builds. Add a local `thumbnail` to a remote PDF when you want a real preview image; otherwise the site renders a lightweight PDF fallback card.

Generic `file` media and local file links do not generate thumbnails. Add a local `thumbnail` when the file needs a visual preview; otherwise the site renders a lightweight fallback card with the file extension badge.

Use `collaborators` to credit people or organizations that worked on an item. Each collaborator needs a `name`; `url` is optional and may point to a website, LinkedIn, GitHub, Google Scholar, or a `mailto:` email link. Collaborators are canonical item metadata and should not be duplicated in translation files.

Thumbnail display controls are optional and affect only Portfolio Gallery cards. `objectFit` accepts `cover`, `contain`, `fill`, or `scale-down`; omit it to use the default cropped `cover` card behavior. `objectPosition` maps to CSS `object-position`, so `"50% 50%"` centers the crop, `"0% 50%"` favors the left edge, and `"100% 50%"` favors the right edge. Use `backgroundColor` with `contain` or `scale-down` to control the letterbox color, and reserve `aspectRatio` for rare images that need a frame other than the default `16 / 10`.

Quick examples:

```yaml
thumbnail:
  path: "/items/my-item/thumbnail.webp"
  alt: "Centered cropped thumbnail."
  objectFit: "cover"
  objectPosition: "50% 50%"
```

```yaml
thumbnail:
  path: "/items/my-item/thumbnail.webp"
  alt: "Full image thumbnail."
  objectFit: "contain"
  backgroundColor: "#ffffff"
```

```yaml
thumbnail:
  path: "/items/my-item/thumbnail.webp"
  alt: "Stretched thumbnail."
  objectFit: "fill"
```

## Translations

Add optional localized display text under `src/content/item-translations/es/<slug>.md` and `src/content/item-translations/ja/<slug>.md`. Missing translations fall back to English, but translation files that exist must point to a canonical item slug.

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

Write the localized narrative body after the frontmatter. Do not duplicate dates, skills, publication flags, collaborators, relations, or asset metadata in translation files; those remain canonical in the matching Markdown file under `src/content/items/`. Translation filenames, relation IDs, public URLs, and public assets continue to use the filename slug, not the folder path.

## CV synchronization

The website item is the factual reference, but every CV remains hand-authored:

1. Update the canonical item.
2. Review each variant listed in `cvReview`.
3. Manually adapt its wording and bullet length.
4. Run `npm run build:cv`.
5. Visually inspect every generated PDF before publishing.
