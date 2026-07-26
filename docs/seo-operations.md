# SEO operations checklist

This checklist records the Search Console handoff for the static portfolio. The repository changes are implemented locally; deployment and Search Console actions are external steps.

## Initial launch checklist

The owner reported these steps as completed on 2026-07-25:

- [x] Deploy the current repository build to GitHub Pages.
- [x] Submit `https://aldrick-t.github.io/sitemap-0.xml` in Google Search Console.
- [x] Request indexing for the homepage and the updated Spanish and Japanese LiDAR and Yeaberry pages.
- [x] Begin Search Console monitoring for English, Mexican Spanish, and Japanese results.

If Search Console still reports that the sitemap cannot be read, confirm these live URLs return HTTP 200 before retrying:

- `https://aldrick-t.github.io/robots.txt`
- `https://aldrick-t.github.io/sitemap-index.xml`
- `https://aldrick-t.github.io/sitemap-0.xml`
- `https://aldrick-t.github.io/google9ac4b0195e52c96f.html`

The direct child sitemap is the preferred submission target for this site because it avoids ambiguity around the generated sitemap index wrapper. Google’s sitemap guidance is at <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>.

## Weekly monitoring

In Search Console, review **Performance → Search results** with these dimensions:

1. Compare the last 28 days with the previous 28 days.
2. Inspect clicks, impressions, click-through rate, and average position.
3. Filter by page to compare `/`, `/es/`, and `/ja/`.
4. Filter by query and record emerging terms rather than editing pages for one-off low-volume queries.
5. Check **Pages → Not indexed** for accidental exclusions, redirects, duplicate canonical selection, or soft 404s.
6. Check **Sitemaps** for the latest read date and discovered URL count.

Useful query themes to monitor:

- English: `robotics engineer`, `ROS 2`, `autonomous navigation`, `soft robotics`, `robot telemetry`, `vid2dataset`.
- Spanish: `ingeniero en robótica`, `navegación autónoma ROS 2`, `robot de cosecha de fresas`, `telemetría vehículo eléctrico`.
- Japanese: `ロボティクス エンジニア`, `ROS 2 自律ナビゲーション`, `イチゴ収穫ロボット`, `ロボット テレメトリ`.

## Monthly quality review

- Inspect the indexed representative URLs with URL Inspection: English, `/es/`, and `/ja/` versions of the homepage, LiDAR project, Yeaberry project, MORI project, and `vid2dataset`.
- Confirm canonical and hreflang references point to the correct language variants.
- Review new external links and confirm they are still public and relevant.
- Add project evidence only when the asset is cleared for public use; see [asset-needs.md](./asset-needs.md).
- Review performance for large media before adding new video or PDF files.

## Authority and discovery

Search visibility also depends on references outside the site. Use only genuine, relevant references:

- Keep the personal website URL consistent on GitHub, LinkedIn, conference profiles, and academic profiles.
- Add the portfolio URL to the README or project description of repositories that represent the work shown here.
- Link to the most relevant project page from technical reports, presentations, and competition pages when those platforms permit it.
- Publish original technical explanations or release notes when there is a real update to share; link those posts to the relevant project page.
- Avoid purchased links, automated directory submissions, keyword-stuffed profiles, and duplicate low-value posts.

The site already exposes GitHub and LinkedIn through the profile structured data. The remaining authority actions require access to those external profiles and should be completed only where the profile owner controls the content.

## Completion criteria

The SEO implementation is considered operational when:

- the deployed sitemap is readable and contains the intended localized URLs;
- the verification file remains reachable;
- representative English, Spanish, and Japanese URLs are indexed or have a valid indexing request;
- no unexpected `noindex`, canonical, or hreflang errors appear;
- Search Console has at least one comparison period for each supported language;
- new content follows the repository validation and localization rules.
