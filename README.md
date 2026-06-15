# Aldrick-t's Engineering Portfolio Page

Repository holding the source for my personal engineering portfolio site, built with Astro and TypeScript, showcasing my projects, skills, and CV. Deployed on GitHub Pages. Feel free to explore the code and use as a template or reference.

## Stack

- Astro + TypeScript for static-site structure and maintainability.
- Markdown Content Collections for portfolio project content.
- Typst for CV source, compiled to PDF in CI during build.
- GitHub Actions for CV build and GitHub Pages deployment.

## Pages

- `/` long-form landing/about page with a hero intro card, Latest, Featured, Trajectory, Skills, and Courses & Certifications
- `/portfolio` project index
- `/portfolio/[slug]` project case studies
- `/cv` multi-variant CV preview with a selector and per-variant download
- `/contact` direct contact links and quick-copy actions
- `/design-preview/homepage` hidden homepage design-preview route for Figma capture
- `/404` not found page

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start dev server:

   ```bash
   npm run dev
   ```

3. Build production output:

   ```bash
   npm run build
   ```

## CV workflow

- The CV system is driven by `cv/manifest.json`.
- `cv/engineering.typ` is the active one-page engineering entrypoint and currently includes `cv/aldrick_tadeo_cv.typ`.
- `npm run build:cv` compiles every manifest variant marked `available: true`.
- The `/cv` page embeds the selected compiled PDF from `public/cv`.

## Editing the site

- Edit homepage hero, latest cards, trajectory, skills, and credentials in `src/data/profile.ts`.
- Edit CV variants and their output paths in `cv/manifest.json`.
- Edit portfolio case studies in `src/content/projects/*.md`.
- Mark featured projects and optionally add contributor contact info through project frontmatter in `src/content/projects/*.md`.
- Replace or add UI icons in `src/assets/icons/ui/` and skill icons in `src/assets/icons/skills/`.
- Adjust the Liquid Glass theme tokens and shared section styling in `src/styles/global.css`.
- Update public contact details in `src/config/site.ts`.

## Deploy

- Push to `main` to trigger `.github/workflows/deploy.yml`.
- GitHub Actions builds CV + site and publishes to GitHub Pages.
