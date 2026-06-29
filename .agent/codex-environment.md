# Codex environment setup

Use these values in Codex project Environment settings so fresh worktrees are ready for this Astro site.

## Setup

```bash
npm ci
npm run content:check
```

`npm ci` installs the exact dependency graph from `package-lock.json`. `npm run content:check` catches broken item frontmatter, missing assets, invalid translation slugs, unknown skill IDs, relation errors, and CV manifest issues before an agent starts changing files.

If the environment image includes Typst and you want CV generation verified during setup, use this stricter setup instead:

```bash
npm ci
npm run content:check
npm run build:cv
```

Do not make `npm run build:cv` mandatory unless Typst is installed in the environment.

## Cleanup

```bash
rm -rf dist .astro
```

This removes Astro build artifacts and cache state. Keep `node_modules` in place unless you intentionally want every worktree cleanup to force a reinstall.

If generated CV PDFs should also be discarded between runs, use:

```bash
rm -rf dist .astro
find public/cv -type f -name '*.pdf' -delete
```

## Actions

Recommended Codex actions:

```bash
npm run content:check
npm run check
npm run build
```

Use `npm run build:cv` as an additional action when CV sources or `cv/manifest.json` changed and Typst is installed.

Use `npm run dev -- --host 127.0.0.1` as the preview action when the Codex environment supports a long-running development server.

## Environment notes

- Node should be compatible with Astro 7. CI currently uses Node `26.4.0` for deploy and Node `20` for the CV workflow; use Node 20 or newer for local/Codex worktrees.
- No required `.env` file is currently needed.
- Network access is needed during setup because `npm ci` downloads npm packages unless the Codex environment provides a warm cache.
- Typst is only required for `npm run build:cv` and `npm run build:all`.
