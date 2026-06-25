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
links:
  - kind: "site"
    label: "Project website"
    url: "https://example.com"
assets: []
relations:
  - id: "another-item-slug"
    label: "Related project"
cvReview: ["engineering", "academic", "full"]
---
```

Write the complete item narrative after the frontmatter. Remove `featuredRank` unless the item is one of the three homepage features.

## CV synchronization

The website item is the factual reference, but every CV remains hand-authored:

1. Update the canonical item.
2. Review each variant listed in `cvReview`.
3. Manually adapt its wording and bullet length.
4. Run `npm run build:cv`.
5. Visually inspect every generated PDF before publishing.
