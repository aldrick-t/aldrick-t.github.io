# Optional asset needs

The site intentionally ships without generated imagery or placeholders. It is fully usable as a text-first portfolio.

Provide these assets later if richer project documentation is desired:

- A current profile portrait with permission for public use.
- LiDAR SLAM: robot, simulation, and generated-map screenshots.
- RoboSoft 2026 harvesting robot: full system, gripper, fabrication, and competition photographs.
- Autonomous harvesting robot: gripper, UR3e integration, and perception-result images.
- Computer-vision navigation: Puzzlebot, test course, and recognition-result images.
- Electrum telemetry: vehicle, hardware, and dashboard images cleared for publication.
- Conference or award photographs only where publication rights are clear.

When adding media to an item, store files under `public/items/<item-slug>/`:

- Use `public/items/<item-slug>/thumbnail.webp` for the Portfolio Gallery card thumbnail.
- Use descriptive names such as `public/items/<item-slug>/gripper-test.webp` or `public/items/<item-slug>/slam-map.webp` for supporting images.
- Reference files from frontmatter with public paths such as `/items/<item-slug>/thumbnail.webp`.
- Put the main gallery card image in `thumbnail`, and supporting item-detail images or YouTube videos in `media`.
- Keep legacy `assets` only for existing item-detail images that do not need gallery thumbnail behavior.

Content validation rejects missing thumbnail/media files, files outside the item folder, empty alt/title text, duplicate published `relevanceRank` values, and unsupported YouTube URLs. Lower `relevanceRank` values appear first in the curated Portfolio Gallery relevance sort; omit the field to use the baseline sort.
