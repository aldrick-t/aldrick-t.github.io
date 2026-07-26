# Universal design language

## Purpose

The visual system is restrained, technical, and research-oriented. It uses a consistent grid, high-contrast typography, sparse sensor-inspired geometry, and a small penguin-as-robot motif when a humanizing theme is useful.

## Core palette

| Token | Name | Hex | Primary use |
| --- | --- | --- | --- |
| `linen` | Linen | `#FAF8EF` | Warm highlight, small robot details, light-mode raised surfaces |
| `ivory` | Ivory | `#f9fbf2` | Light-mode base, light text on dark surfaces |
| `light-cyan` | Light Cyan | `#d7f9ff` | Sensor points, soft fills, code and selection surfaces |
| `baby-blue-ice` | Baby Blue Ice | `#afcbff` | Grid lines, borders, focus states, secondary technical accents |
| `prussian-blue` | Prussian Blue | `#0e1c36` | Dark-mode base, primary text, strongest structural accent |

The light mode uses Ivory as its base and Prussian Blue as its highest-contrast accent. The dark mode uses Prussian Blue as its base and Ivory as its highest-contrast accent. Alpha variants may be used for borders and surfaces, but must derive from these five colors.

## Typography

- Primary family: `Inter`.
- Fallback stack: `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Display name: 72 px, weight 800, 3 px tracking.
- Primary descriptor: 24 px, weight 700, 4 px tracking.
- Secondary descriptor: 14 px, weight 600, 3 px tracking.
- Metadata label: 12 px, weight 600, 2 px tracking.
- SVG text remains live text rather than outlined paths so the source stays editable. Raster exports should be rendered in an environment with Inter installed.

## Layout and spacing

- Canvas: 1200 × 630 px for social previews.
- Safe outer margin: 72 px.
- Text block width: approximately 628 px.
- Name baseline: y = 238 px.
- Accent rule: y = 278 px, 4 px high.
- Primary descriptor baseline: y = 326 px.
- Secondary descriptor baseline: y = 374 px.
- Footer metadata baseline: y = 536 px.
- Lidar scan origin: (1000, 356) px.
- Lidar sweep ellipses: rx/ry pairs of 76/26, 128/44, 180/62, and 228/80 px, rotated -12 degrees.
- Isometric street plane: perspective rays converge on the scan origin and expand toward the lower canvas edge.

## Graphic language

Use isometric street-plane rays, elliptical sweep bands, depth contours, and sparse height-bearing returns to suggest a LiDAR point-cloud reconstruction of city streets. Building façades should appear as vertical dotted returns on either side of a perspective road corridor, with lower-density points on the road plane and taller structures fading into the distance. The scan should read as a three-dimensional urban scene rather than a flat target or radial diagram. No mascot is used in the current universal social-preview mark.

## Social-preview assets

- Text source: `public/og/default.svg`.
- Intermediate raster: `public/og/default-base.png`.
- Final standard OG raster: `public/og/default.png`.
- Earlier light/dark SVG explorations remain available as `public/og/portfolio-og-light.svg` and `public/og/portfolio-og-dark.svg`.
- Final export format: PNG or JPEG as needed.
- Target raster size: 1200 × 630 px.
- Target file size: preferably below 1 MB.
- Keep all essential text inside the 72 px safe margin.
