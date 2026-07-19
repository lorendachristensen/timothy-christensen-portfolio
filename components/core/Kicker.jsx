import React from 'react';

/**
 * Kicker — the orange uppercase eyebrow above a headline. Optional leading rule.
 */
export function Kicker({ children, rule = true, color = 'var(--brand)', style = {}, ...rest }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-kicker)',
        fontWeight: 600,
        letterSpacing: 'var(--tracking-kicker)',
        textTransform: 'uppercase',
        color,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        ...style,
      }}
      {...rest}
    >
      {rule && <span style={{ width: '24px', height: '2px', background: color, display: 'inline-block' }} />}
      {children}
    </span>
  );
}
