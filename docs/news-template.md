# News template

News records live under `src/content/items/news/` and are separate from portfolio items.

```yaml
---
title: "Short title"
summary: "Concise text used in News lists and the homepage preview."
newsKind: "post"
datePosted: "2026-07"
published: false
relations: []
---

Write the complete post here for `newsKind: post`.
```

Use `newsKind: entry` for a short update. Entries should have no Markdown body and never receive a detail route.

Localized News copy belongs in `src/content/news-translations/es/` and `src/content/news-translations/ja/`, using the same filename as the canonical News record. Translations may omit body content only for entries; published post translations require a complete body.
