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

When adding an asset to an item, store it under `public/items/<item-slug>/` and declare its path, alt text, caption, and credit in that item's `assets` field. Content validation will reject missing files or empty alt text.
