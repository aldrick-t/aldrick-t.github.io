# Engineering Portfolio (Astro + TypeScript)

This repository hosts a responsive personal engineering portfolio built for GitHub Pages.

## Stack

- Astro + TypeScript for static-site structure and maintainability
- Markdown Content Collections for portfolio project content
- Typst for CV source, compiled to PDF in CI
- GitHub Actions for CV build and GitHub Pages deployment

## Pages

- `/` landing page with immediate access to Portfolio, CV, GitHub, and LinkedIn
- `/portfolio` project index
- `/portfolio/[slug]` project case studies
- `/cv` inline CV preview + quick download
- `/social` LinkedIn-focused page with official badge + fallback CTA links
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

- Edit Typst source at `cv/main.typ`.
- CI compiles it to `public/cv/aldrick-tadeo-cv.pdf`.
- The `/cv` page always serves that file for preview and download.

## Deploy

- Push to `main` to trigger `.github/workflows/deploy.yml`.
- GitHub Actions builds CV + site and publishes to GitHub Pages.
