# Timothy Christensen — Portfolio Design System

A from-scratch brand and design system for **Timothy Christensen**, a Sports Media major at **Oklahoma State University** and staff writer for **The O'Colly** (OSU's student newspaper). The site is a living résumé / portfolio for internship applications, showcasing published articles, on-camera press clips, and short-form social work.

> **Sources:** None provided — this system was created from scratch. No existing codebase, Figma, logo, or brand assets. Direction confirmed with the user: *bold sports-broadcast energy (ESPN / The Athletic feel), color decided for me → drew on OSU school spirit (orange + black).* If real brand assets, headshots, or O'Colly clips exist, drop them in `assets/` and swap the placeholders.

---

## Content Fundamentals

- **Voice:** Confident, newsroom-direct, first person for bio ("I cover Cowboy sports"), third-person AP-style for articles. No hype filler. Active verbs, present tense in recaps.
- **Casing:** Headlines and section titles are **UPPERCASE** (Oswald display). Body and article copy are sentence case. Kickers/labels are UPPERCASE mono.
- **Tone:** Sports-page energy — punchy headlines, a dateline convention ("STILLWATER —"), quotes pulled out big. Credible, not braggy.
- **Signature punctuation:** A single **orange period** ends key display phrases ("Full Time." / "Let's talk."). Use sparingly — it's the wordmark tic.
- **Emoji:** None. A single ▶ glyph marks video tags/badges; that's the only pictograph used.
- **Examples:** "I cover Cowboy sports." · "Cowboys stun No. 12 Longhorns in Stillwater thriller" · "Some nights the story writes itself."

## Visual Foundations

- **Colors:** Broadcast **orange** (`--brand` #FF6A00) as the single hero accent over a **warm-black** ink ramp (`--ink-950` #0A0A0B) and a warm off-white **paper** page (#F7F6F3). High contrast; orange is used surgically (kickers, primary buttons, the period, video tags), never as large fills beyond hero rules.
- **Type:** Display **Oswald** (condensed, 700, uppercase, tight tracking, line-height 0.92–1.0) for impact; **IBM Plex Sans** for UI/short-form; **Newsreader** serif for long-form article reading (19px / 1.72); **IBM Plex Mono** for kickers, timestamps, labels, bylines.
- **Backgrounds:** Flat solids only. Alternating **dark (ink-950) hero blocks** vs **paper** body sections gives broadcast rhythm. No gradients, no textures, no patterns.
- **Borders:** The signature move is a **hard 2px black rule** — under section headings, around cards, around image slots. Thin 1px `--border` for internal dividers only.
- **Corners:** Square. `--radius-sm` 2px is the default; 4px max. Only status dots / round badges use pill radius.
- **Shadows:** Crisp, not blurry. Cards are flat at rest; on **hover** they translate `-3px,-3px` and drop a **hard offset shadow** (`6px 6px 0 black`) — a printed / lower-third pop. No soft ambient blur.
- **Hover / press:** Buttons darken (orange→`--brand-hover`) or invert (ghost→black fill); press nudges `translateY(1px)`. Cards pop the hard shadow. Video rows tint to `--brand-soft`.
- **Imagery:** Placeholders are neutral `--ink-100` blocks with a 2px black frame and a corner content-type Tag. Real photos should read warm and high-contrast (sports action / press settings). No duotone.
- **Motion:** Restrained. `--ease-out` cubic-bezier(0.22,1,0.36,1), 120–220ms. Fades and small translates only — no bounces, no infinite loops.
- **Layout:** `--maxw-page` 1200px; article measure `--maxw-read` 680px. 4px spacing scale. Sticky dark nav with orange active-underline.

## Iconography

- **No custom icon set and no logo were provided — none were invented.** The brand wordmark is rendered in plain Oswald type ("Timothy Christensen" + orange period).
- Pictographs are avoided. The only glyphs in use are a Unicode **▶** (play, on video tags/badges) and a **/** slash as a byline separator. If a broader icon set becomes necessary, substitute **Lucide** (CDN, 2px stroke — matches the square/hard-edged aesthetic) and document it here. *(Not currently loaded — flagged as a future addition.)*
- **Emoji are never used.**

---

## Components

Reusable primitives, exported under `window.TimothyChristensenPortfolioDesignSystem_d29e8f`.

**Core** (`components/core/`)
- **Button** — primary / secondary / ghost, sm / md / lg.
- **Tag** — content-type / topic chip (article · video · social · topic).
- **Kicker** — orange uppercase eyebrow with optional rule.
- **SectionHeading** — kicker + title + signature 2px underline + action slot.

**Content** (`components/content/`)
- **Byline** — author · outlet · date · read-time metadata row.
- **ArticleCard** — clip card for the work grid (cover, tag, headline, meta).
- **VideoCard** — horizontal press/highlight clip row with play badge + duration.
- **StatBlock** — big display figure + label for the résumé/about page.

## UI Kits

- **`ui_kits/portfolio/`** — interactive click-through portfolio site: Home, Work (filterable), Video, Article (long-form), About (résumé). See its `README.md`.

---

## Index / Manifest

- `styles.css` — global entry (import this one file). `@import`s the tokens below.
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/fonts.css`
- `guidelines/*.card.html` — foundation specimen cards (Colors, Type, Spacing).
- `components/core/`, `components/content/` — primitives (`.jsx` + `.d.ts` + `.prompt.md` + card).
- `ui_kits/portfolio/` — full portfolio site recreation.
- `SKILL.md` — Agent-Skills-compatible entry for downstream use.
- Generated (do not edit): `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.

## CAVEATS — please help me make this perfect

1. **Fonts are loaded from Google Fonts CDN**, not bundled binaries (Oswald, IBM Plex Sans, IBM Plex Mono, Newsreader). These are close matches to the intended sports-newsroom feel. **If you want specific licensed fonts, send the files and I'll bundle them with proper `@font-face` rules.**
2. **No logo, headshot, or real clips exist yet.** The wordmark is plain type and all images are placeholder blocks. **Send a headshot, any logo/mark, and links or exports of your real O'Colly stories/videos** and I'll wire them in.
3. **Orange is OSU-inspired but original** — it is *not* an official Oklahoma State or O'Colly brand asset (those are trademarked). Confirm you're comfortable with the exact orange, or give me a hex.
4. **Content is representative placeholder** (fictional games, quotes, stats). Replace with real bylines before using this as a résumé.
5. **No icon set is loaded.** If you want icons (social links, arrows), tell me and I'll wire up Lucide.

**My ask:** confirm the orange, the font choices, and send me (a) a headshot, (b) 4–6 real O'Colly article links, and (c) any press-conference video clips — then I'll replace every placeholder and we'll have a real, shippable portfolio.
