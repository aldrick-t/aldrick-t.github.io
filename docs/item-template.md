# Item template

Use `npm run new:item -- my-item project` to create a draft, or copy this frontmatter into a new lowercase kebab-case file under `src/content/items/`.

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
assets: []
thumbnail:
  path: "/items/my-item/thumbnail.webp"
  alt: "Short description of the thumbnail image."
  objectPosition: "50% 50%"
media:
  - kind: "image"
    path: "/items/my-item/detail.webp"
    alt: "Short description of the detail image."
    caption: "Optional caption."
  - kind: "youtube"
    url: "https://www.youtube.com/watch?v=exampleid12"
    title: "Video title for accessibility"
    caption: "Optional caption."
relations:
  - id: "another-item-slug"
    label: "Related project"
cvReview: ["engineering", "academic", "full"]
---
```

Write the complete item narrative after the frontmatter. Remove `featuredRank` unless the item is one of the three homepage features.

Use `relevanceRank` only when manually curating Portfolio Gallery relevance. Lower numbers appear first. Omit `relevanceRank` to let the baseline relevance sort use featured rank, item type, media availability, recency, and title.

Store gallery thumbnails and media under `public/items/<item-slug>/`. Use `/items/<item-slug>/thumbnail.webp` for the main card image and descriptive names such as `/items/<item-slug>/prototype-test.webp` for supporting media. Content validation rejects missing thumbnail/media paths, empty alt/title text, duplicate published relevance ranks, and unsupported YouTube URLs.

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

Write the localized narrative body after the frontmatter. Do not duplicate dates, skills, publication flags, relations, or asset metadata in translation files; those remain canonical in `src/content/items/<slug>.md`.

## CV synchronization

The website item is the factual reference, but every CV remains hand-authored:

1. Update the canonical item.
2. Review each variant listed in `cvReview`.
3. Manually adapt its wording and bullet length.
4. Run `npm run build:cv`.
5. Visually inspect every generated PDF before publishing.
