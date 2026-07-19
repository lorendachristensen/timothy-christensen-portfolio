/* @ds-bundle: {"format":4,"namespace":"TimothyChristensenPortfolioDesignSystem_d29e8f","components":[{"name":"ArticleCard","sourcePath":"components/content/ArticleCard.jsx"},{"name":"Byline","sourcePath":"components/content/Byline.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"VideoCard","sourcePath":"components/content/VideoCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Kicker","sourcePath":"components/core/Kicker.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/content/ArticleCard.jsx":"6112b0d85be0","components/content/Byline.jsx":"b751a3a569af","components/content/StatBlock.jsx":"44afcca1ded9","components/content/VideoCard.jsx":"4d83cbbf1645","components/core/Button.jsx":"f8d40a96f9cf","components/core/Kicker.jsx":"488d7f5e2ee1","components/core/SectionHeading.jsx":"357800f0c597","components/core/Tag.jsx":"fd31b19d9fd6","ui_kits/portfolio/Footer.jsx":"503cd677f6ac","ui_kits/portfolio/Nav.jsx":"b4c760e153b9","ui_kits/portfolio/screens.jsx":"55c343ba5084"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TimothyChristensenPortfolioDesignSystem_d29e8f = window.TimothyChristensenPortfolioDesignSystem_d29e8f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Byline.jsx
try { (() => {
/**
 * Byline — author + publication + date + read-time metadata row (mono).
 */
function Byline({
  author = 'Timothy Christensen',
  outlet,
  date,
  readTime,
  style = {}
}) {
  const parts = [outlet, date, readTime].filter(Boolean);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, "By ", author), parts.map((p, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      color: 'var(--ink-300)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, p))));
}
Object.assign(__ds_scope, { Byline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Byline.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
/**
 * StatBlock — a big display number + label. Used on the About/resume page
 * (e.g. "40+ Bylines"). `inverse` for use on dark backgrounds.
 */
function StatBlock({
  value,
  label,
  inverse = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--fs-display-l)',
      lineHeight: 0.9,
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--brand)'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-sm)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: inverse ? 'var(--text-inverse-mut)' : 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/VideoCard.jsx
try { (() => {
/**
 * VideoCard — horizontal media row for press-conference / highlight clips.
 * Thumbnail with a play badge on the left, meta on the right.
 */
function VideoCard({
  title,
  meta,
  duration,
  image,
  href = '#',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'stretch',
      background: 'var(--surface-card)',
      border: '2px solid var(--ink-950)',
      borderRadius: 'var(--radius-sm)',
      textDecoration: 'none',
      color: 'inherit',
      padding: 'var(--space-3)',
      transition: 'background var(--dur-fast)',
      ...style
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--brand-soft)',
    onMouseLeave: e => e.currentTarget.style.background = 'var(--surface-card)'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '150px',
      flexShrink: 0,
      aspectRatio: '16/9',
      background: image ? `#000 center/cover url("${image}")` : 'var(--ink-900)',
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '38px',
      height: '38px',
      borderRadius: '999px',
      background: 'var(--brand)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      paddingLeft: '3px'
    }
  }, "\u25B6"), duration && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: '6px',
      right: '6px',
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      fontWeight: 600,
      background: 'rgba(10,10,11,0.85)',
      color: '#fff',
      padding: '2px 5px',
      borderRadius: '2px'
    }
  }, duration)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '8px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--brand)'
    }
  }, "Video"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      fontSize: '1.25rem',
      lineHeight: 1.05,
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, meta)));
}
Object.assign(__ds_scope, { VideoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/VideoCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the brand's primary action. Square-edged, condensed uppercase label.
 * variant: 'primary' | 'secondary' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: '12px',
      padding: '7px 14px',
      letterSpacing: '0.08em'
    },
    md: {
      fontSize: '14px',
      padding: '11px 22px',
      letterSpacing: '0.08em'
    },
    lg: {
      fontSize: '16px',
      padding: '15px 30px',
      letterSpacing: '0.06em'
    }
  };
  const variants = {
    primary: {
      background: 'var(--brand)',
      color: 'var(--text-on-brand)',
      border: '2px solid var(--brand)'
    },
    secondary: {
      background: 'var(--ink-950)',
      color: 'var(--white)',
      border: '2px solid var(--ink-950)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-950)',
      border: '2px solid var(--ink-950)'
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      lineHeight: 1,
      textDecoration: 'none',
      transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast), color var(--dur-fast)',
      ...sizes[size],
      ...variants[variant],
      ...style
    },
    onMouseDown: e => e.currentTarget.style.transform = 'translateY(1px)',
    onMouseUp: e => e.currentTarget.style.transform = 'translateY(0)',
    onMouseEnter: e => {
      if (variant === 'primary') e.currentTarget.style.background = 'var(--brand-hover)';
      if (variant === 'ghost') {
        e.currentTarget.style.background = 'var(--ink-950)';
        e.currentTarget.style.color = 'var(--white)';
      }
      if (variant === 'secondary') e.currentTarget.style.background = 'var(--ink-800)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = variants[variant].background;
      e.currentTarget.style.color = variants[variant].color;
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Kicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Kicker — the orange uppercase eyebrow above a headline. Optional leading rule.
 */
function Kicker({
  children,
  rule = true,
  color = 'var(--brand)',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-kicker)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-kicker)',
      textTransform: 'uppercase',
      color,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      ...style
    }
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '24px',
      height: '2px',
      background: color,
      display: 'inline-block'
    }
  }), children);
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
/**
 * SectionHeading — a page/section title with kicker eyebrow and the signature
 * full-width 2px black rule beneath. Optional right-aligned action slot.
 */
function SectionHeading({
  kicker,
  title,
  action,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '2px solid var(--border-strong)',
      paddingBottom: 'var(--space-3)',
      ...style
    }
  }, kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Kicker, null, kicker)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 'var(--fs-display-m)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, title), action && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, action)));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — content-type label (article / video / social) or generic topic chip.
 * Square, 2px border, condensed uppercase. `kind` picks the accent.
 */
function Tag({
  kind = 'topic',
  children,
  style = {},
  ...rest
}) {
  const kinds = {
    article: {
      background: 'var(--ink-950)',
      color: 'var(--white)',
      border: '2px solid var(--ink-950)'
    },
    video: {
      background: 'var(--brand)',
      color: 'var(--white)',
      border: '2px solid var(--brand)'
    },
    social: {
      background: 'var(--white)',
      color: 'var(--ink-950)',
      border: '2px solid var(--ink-950)'
    },
    topic: {
      background: 'transparent',
      color: 'var(--ink-600)',
      border: '2px solid var(--ink-300)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '3px 8px',
      borderRadius: 'var(--radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      lineHeight: 1.3,
      ...kinds[kind],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/ArticleCard.jsx
try { (() => {
/**
 * ArticleCard — a clip in the work grid. Image slot on top, kicker/tag,
 * headline, outlet+date footer. Hover = 2px black border + hard offset shadow.
 */
function ArticleCard({
  kind = 'article',
  category,
  title,
  outlet = "The O'Colly",
  date,
  image,
  href = '#',
  style = {}
}) {
  const onEnter = e => {
    e.currentTarget.style.transform = 'translate(-3px,-3px)';
    e.currentTarget.style.boxShadow = 'var(--shadow-hard)';
  };
  const onLeave = e => {
    e.currentTarget.style.transform = 'translate(0,0)';
    e.currentTarget.style.boxShadow = 'none';
  };
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '2px solid var(--ink-950)',
      borderRadius: 'var(--radius-sm)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'transform var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/10',
      background: image ? `#000 center/cover url("${image}")` : 'var(--ink-100)',
      borderBottom: '2px solid var(--ink-950)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '10px',
      left: '10px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    kind: kind
  }, kind === 'video' ? '▶ Video' : kind === 'social' ? 'Social' : 'Article'))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      flex: 1
    }
  }, category && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--brand)'
    }
  }, category), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      fontSize: 'var(--fs-h)',
      lineHeight: 1.05,
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, outlet, date ? ` · ${date}` : '')));
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Footer.jsx
try { (() => {
// Shared footer for the portfolio kit.
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--white)',
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--maxw-page)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--space-6)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '40px',
      textTransform: 'uppercase',
      lineHeight: 0.95,
      letterSpacing: '-0.01em'
    }
  }, "Let's talk", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: 'var(--ink-400)',
      marginTop: '12px'
    }
  }, "Sports Media \xB7 Oklahoma State University \xB7 Class of 2028")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px'
    }
  }, ['Email', 'Twitter/X', 'LinkedIn', 'The O\'Colly'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: 'var(--ink-300)',
      textDecoration: 'none',
      borderBottom: '1px solid var(--ink-700)',
      paddingBottom: '2px'
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--ink-800)',
      textAlign: 'center',
      padding: '16px',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      color: 'var(--ink-600)'
    }
  }, "\xA9 2026 Timothy Christensen \u2014 Portfolio & work samples"));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Nav.jsx
try { (() => {
// Shared top navigation for the portfolio kit.
function Nav({
  current,
  onNav
}) {
  const items = ['Home', 'Work', 'Video', 'About'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--ink-950)',
      color: 'var(--white)',
      borderBottom: '2px solid var(--ink-950)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--maxw-page)',
      margin: '0 auto',
      padding: '0 var(--space-6)',
      height: '68px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav('Home'),
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '2px',
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '22px',
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: 'var(--white)'
    }
  }, "Timothy Christensen"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '22px'
    }
  }, ".")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      alignItems: 'center'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    onClick: () => onNav(it),
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      color: current === it ? 'var(--brand)' : 'var(--ink-300)',
      paddingBottom: '3px',
      borderBottom: current === it ? '2px solid var(--brand)' : '2px solid transparent'
    }
  }, it)))));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Sample portfolio data + the four screens. Composes design-system components
// from window[NS]. Content is representative sample work for a student journalist.
const NS = window.TimothyChristensenPortfolioDesignSystem_d29e8f;
const {
  Button,
  Tag,
  Kicker,
  SectionHeading,
  ArticleCard,
  VideoCard,
  Byline,
  StatBlock
} = NS;
const ARTICLES = [{
  kind: 'article',
  category: "Football",
  title: "Cowboys stun No. 12 Longhorns in Stillwater thriller",
  outlet: "The O'Colly",
  date: "Oct 2025"
}, {
  kind: 'article',
  category: "Men's Basketball",
  title: "Freshman guard's career night lifts OSU past K-State",
  outlet: "The O'Colly",
  date: "Feb 2026"
}, {
  kind: 'video',
  category: "Press Conference",
  title: "Asking Gundy about the fourth-quarter QB rotation",
  outlet: "The O'Colly",
  date: "Mar 2026"
}, {
  kind: 'article',
  category: "Wrestling",
  title: "Inside the Cowboys' pursuit of another national title",
  outlet: "The O'Colly",
  date: "Jan 2026"
}, {
  kind: 'social',
  category: "Gameday",
  title: "Live thread: Bedlam returns to Boone Pickens Stadium",
  outlet: "@tchristensen",
  date: "Nov 2025"
}, {
  kind: 'article',
  category: "Feature",
  title: "The walk-on who became a captain: Marcus Reed's road",
  outlet: "The O'Colly",
  date: "Sep 2025"
}];
const VIDEOS = [{
  title: "Asking Gundy about the QB rotation",
  meta: "Press conference · Mar 2026",
  duration: "0:47"
}, {
  title: "Postgame with the freshman guard after 28 points",
  meta: "Locker room · Feb 2026",
  duration: "1:12"
}, {
  title: "Wrestling media day one-on-one",
  meta: "Media day · Jan 2026",
  duration: "0:58"
}];
function Wrap({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--maxw-page)',
      margin: '0 auto',
      padding: '0 var(--space-6)',
      ...style
    }
  }, children);
}

/* ------------------------------ HOME ------------------------------ */
function Home({
  onNav
}) {
  const lead = ARTICLES[0];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--white)',
      paddingTop: 'var(--space-8)',
      paddingBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Wrap, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "Sports Media \xB7 Oklahoma State")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 'var(--fs-display-xl)',
      lineHeight: 0.92,
      letterSpacing: '-0.02em',
      margin: 0,
      maxWidth: '14ch'
    }
  }, "I cover", /*#__PURE__*/React.createElement("br", null), "Cowboy", /*#__PURE__*/React.createElement("br", null), "sports", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-lead)',
      lineHeight: 1.5,
      color: 'var(--ink-300)',
      maxWidth: '52ch',
      marginTop: 'var(--space-5)'
    }
  }, "Student journalist at ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--white)'
    }
  }, "The O'Colly"), " writing features, game recaps and asking the questions from the front row. This is my published work."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNav('Work')
  }, "See the work"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onNav('About'),
    style: {
      color: 'var(--white)',
      borderColor: 'var(--white)'
    }
  }, "About me")))), /*#__PURE__*/React.createElement(Wrap, {
    style: {
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    kicker: "Featured",
    title: "Latest story",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => onNav('Work')
    }, "All work")
  }), /*#__PURE__*/React.createElement("div", {
    onClick: () => onNav('Article'),
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 'var(--space-6)',
      marginTop: 'var(--space-6)',
      cursor: 'pointer',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/10',
      background: 'var(--ink-100)',
      border: '2px solid var(--ink-950)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '14px',
      left: '14px'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    kind: "article"
  }, "Article"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    rule: false
  }, lead.category), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 'var(--fs-display-m)',
      lineHeight: 1.0,
      letterSpacing: '-0.01em',
      margin: 0,
      color: 'var(--text-strong)'
    }
  }, lead.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body)',
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: 0
    }
  }, "A raucous night in Stillwater as the Cowboys knocked off a ranked opponent for the first time in three seasons."), /*#__PURE__*/React.createElement(Byline, {
    outlet: lead.outlet,
    date: lead.date,
    readTime: "4 min read"
  })))), /*#__PURE__*/React.createElement(Wrap, {
    style: {
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    kicker: "Recent",
    title: "More clips"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-6)'
    }
  }, ARTICLES.slice(1, 4).map((a, i) => /*#__PURE__*/React.createElement(ArticleCard, _extends({
    key: i
  }, a, {
    href: "#"
  }))))));
}

/* ------------------------------ WORK ------------------------------ */
function Work() {
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Article', 'Video', 'Social'];
  const shown = ARTICLES.filter(a => filter === 'All' || a.kind === filter.toLowerCase());
  return /*#__PURE__*/React.createElement(Wrap, {
    style: {
      paddingTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    kicker: "Portfolio",
    title: "Published work"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-5)'
    }
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFilter(f),
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '7px 14px',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sm)',
      border: '2px solid var(--ink-950)',
      background: filter === f ? 'var(--ink-950)' : 'transparent',
      color: filter === f ? 'var(--white)' : 'var(--ink-950)'
    }
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-6)'
    }
  }, shown.map((a, i) => /*#__PURE__*/React.createElement(ArticleCard, _extends({
    key: i
  }, a, {
    href: "#"
  })))));
}

/* ------------------------------ VIDEO ------------------------------ */
function VideoPage() {
  return /*#__PURE__*/React.createElement(Wrap, {
    style: {
      paddingTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    kicker: "On camera",
    title: "Press & video"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-lead)',
      color: 'var(--text-muted)',
      maxWidth: '54ch',
      marginTop: 'var(--space-4)'
    }
  }, "Clips of me on the beat \u2014 asking questions at press conferences and postgame availabilities."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)',
      maxWidth: '760px'
    }
  }, VIDEOS.map((v, i) => /*#__PURE__*/React.createElement(VideoCard, _extends({
    key: i
  }, v, {
    href: "#"
  })))));
}

/* ------------------------------ ARTICLE ------------------------------ */
function Article({
  onNav
}) {
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--white)',
      paddingTop: 'var(--space-7)',
      paddingBottom: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--maxw-read)',
      margin: '0 auto',
      padding: '0 var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "Football \xB7 Game Recap")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 'var(--fs-display-l)',
      lineHeight: 0.98,
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, "Cowboys stun No. 12 Longhorns in Stillwater thriller"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Byline, {
    outlet: "The O'Colly",
    date: "Oct 12, 2025",
    readTime: "4 min read",
    style: {
      color: 'var(--ink-300)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--maxw-read)',
      margin: '0 auto',
      padding: '0 var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/9',
      background: 'var(--ink-100)',
      border: '2px solid var(--ink-950)',
      margin: 'var(--space-6) 0'
    }
  }), ["STILLWATER — The final whistle hadn't yet echoed off the Boone Pickens rafters when the student section began its slow roll toward the field.", "Oklahoma State's 27-24 upset of No. 12 Texas on Saturday was the program's first win over a ranked opponent in three seasons, and it came the way the Cowboys have promised all year: with a defense that refused to break and a freshman quarterback who refused to blink.", "\"We talked all week about earning the moment,\" head coach Mike Gundy said afterward. \"These kids earned it.\"", "The go-ahead drive covered 71 yards in nine plays, capped by a 12-yard strike with 1:04 remaining that sent the crowd of 55,000 into a frenzy that lasted well past midnight."].map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '19px',
      lineHeight: 'var(--lh-read)',
      color: 'var(--text-body)',
      margin: '0 0 var(--space-5)'
    }
  }, p)), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      borderLeft: '3px solid var(--brand)',
      paddingLeft: 'var(--space-4)',
      margin: 'var(--space-6) 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      textTransform: 'uppercase',
      fontSize: '1.75rem',
      lineHeight: 1.1,
      color: 'var(--text-strong)'
    }
  }, "\"Some nights the story writes itself.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '2px solid var(--border-strong)',
      marginTop: 'var(--space-7)',
      paddingTop: 'var(--space-5)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Byline, {
    outlet: "The O'Colly",
    date: "Oct 12, 2025"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => onNav('Work')
  }, "\u2190 Back to work"))));
}

/* ------------------------------ ABOUT ------------------------------ */
function About() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--white)',
      paddingTop: 'var(--space-8)',
      paddingBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Wrap, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "About")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 'var(--fs-display-l)',
      lineHeight: 0.96,
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, "Timothy", /*#__PURE__*/React.createElement("br", null), "Christensen"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-lead)',
      lineHeight: 1.55,
      color: 'var(--ink-300)',
      marginTop: 'var(--space-5)'
    }
  }, "I'm a Sports Media major at Oklahoma State University and a staff writer for The O'Colly, OSU's independent student newspaper. I cover football, basketball and wrestling \u2014 on the page and on camera."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Download r\xE9sum\xE9"))), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/5',
      background: 'var(--ink-800)',
      border: '2px solid var(--ink-700)'
    }
  })))), /*#__PURE__*/React.createElement(Wrap, {
    style: {
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      paddingBottom: 'var(--space-7)',
      borderBottom: '2px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "40+",
    label: "Published bylines"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "12",
    label: "Video clips"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "3",
    label: "Sports covered"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "2028",
    label: "Expected grad"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8)',
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 'var(--fs-display-s)',
      margin: '0 0 var(--space-4)'
    }
  }, "Experience"), [['Staff Writer', "The O'Colly", '2024 — Present'], ['Contributor', 'OSU Athletics Media', '2025'], ['Sports Desk Intern', 'Stillwater News Press', 'Summer 2025']].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 'var(--space-3) 0',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, r[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      color: 'var(--text-muted)'
    }
  }, r[1])), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, r[2])))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 'var(--fs-display-s)',
      margin: '0 0 var(--space-4)'
    }
  }, "Skills"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-2)'
    }
  }, ['Reporting', 'Feature writing', 'AP Style', 'Interviewing', 'On-camera', 'Video editing', 'Social/short-form', 'Game recaps', 'Deadline filing'].map(s => /*#__PURE__*/React.createElement(Tag, {
    key: s,
    kind: "topic"
  }, s)))))));
}
Object.assign(window, {
  Home,
  Work,
  VideoPage,
  Article,
  About
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.Byline = __ds_scope.Byline;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.VideoCard = __ds_scope.VideoCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Tag = __ds_scope.Tag;

})();
