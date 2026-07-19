import React from 'react';

/**
 * Tag — content-type label (article / video / social) or generic topic chip.
 * Square, 2px border, condensed uppercase. `kind` picks the accent.
 */
export function Tag({ kind = 'topic', children, style = {}, ...rest }) {
  const kinds = {
    article: { background: 'var(--ink-950)', color: 'var(--white)', border: '2px solid var(--ink-950)' },
    video:   { background: 'var(--brand)',   color: 'var(--white)', border: '2px solid var(--brand)' },
    social:  { background: 'var(--white)',   color: 'var(--ink-950)', border: '2px solid var(--ink-950)' },
    topic:   { background: 'transparent',    color: 'var(--ink-600)', border: '2px solid var(--ink-300)' },
  };
  return (
    <span
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
