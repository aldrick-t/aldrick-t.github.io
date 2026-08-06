# Template synchronization

This portfolio consumes reusable site software from tagged releases of atad-portfolio-template. It is a downstream relationship: releases flow into this repository, while personal content never flows back automatically.

## Update from a template release

1. Create a branch for the update.
2. Preview the release:

   ~~~bash
   npm run sync:template -- vX.Y.Z
   ~~~

3. Review the reported shared paths, then apply the update:

   ~~~bash
   npm run sync:template -- vX.Y.Z --apply
   ~~~

4. Run npm run content:check, npm run check, npm run build, and npm run build:cv when Typst is available.
5. Inspect the generated site and CV output, then merge the update pull request.

The sync command only accepts semver tags, clones the template into a temporary directory, performs local static safety checks, and copies only the paths allowlisted in .template-sync.json. It never deletes local files.

## Contribute reusable changes upstream

When a change made here is reusable, recreate its minimal sanitized form in the template repository. Remove names, contact data, portfolio text, media, generated documents, and deployment details. Release the accepted template change, then bring that release back through the normal downstream update path.

Do not automatically synchronize this repository back to the template. src/config/site.local.ts, src/data/skills.local.ts, src/content/, cv/, public/, tools/, and deployment configuration are protected local paths.
