# Portfolio Site — UI Kit

An interactive, click-through recreation of Timothy Christensen's student-journalist portfolio (a living résumé for internship applications). Sparse content by design — he's early in his career.

## Screens
- **Home** — dark broadcast hero, featured story, recent clips grid.
- **Work** — filterable grid of published clips (All / Article / Video / Social).
- **Video** — press-conference & on-camera clips as horizontal `VideoCard` rows.
- **Article** — long-form reading page (Newsreader serif, orange pull-quote).
- **About** — bio, résumé stats (`StatBlock`), experience table, skills tags.

## Files
- `index.html` — entry; mounts a tiny client-side router across the four screens.
- `Nav.jsx` / `Footer.jsx` — shared chrome (exported to `window`).
- `screens.jsx` — `Home`, `Work`, `VideoPage`, `Article`, `About` + sample data.

Composes design-system primitives from `window.TimothyChristensenPortfolioDesignSystem_d29e8f`
(`Button`, `Tag`, `Kicker`, `SectionHeading`, `ArticleCard`, `VideoCard`, `Byline`, `StatBlock`).

Sample content (games, quotes, stats) is representative placeholder — swap in his real O'Colly clips.
