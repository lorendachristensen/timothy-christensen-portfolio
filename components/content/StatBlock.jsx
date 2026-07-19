import React from 'react';

/**
 * StatBlock — a big display number + label. Used on the About/resume page
 * (e.g. "40+ Bylines"). `inverse` for use on dark backgrounds.
 */
export function StatBlock({ value, label, inverse = false, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...style }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-display-l)',
        lineHeight: 0.9,
        letterSpacing: 'var(--tracking-tight)',
        color: 'var(--brand)',
      }}>{value}</span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-sm)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: inverse ? 'var(--text-inverse-mut)' : 'var(--text-muted)',
      }}>{label}</span>
    </div>
  );
}
