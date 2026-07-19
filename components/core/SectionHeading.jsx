import React from 'react';
import { Kicker } from './Kicker.jsx';

/**
 * SectionHeading — a page/section title with kicker eyebrow and the signature
 * full-width 2px black rule beneath. Optional right-aligned action slot.
 */
export function SectionHeading({ kicker, title, action, style = {} }) {
  return (
    <div style={{ borderBottom: '2px solid var(--border-strong)', paddingBottom: 'var(--space-3)', ...style }}>
      {kicker && <div style={{ marginBottom: '10px' }}><Kicker>{kicker}</Kicker></div>}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: 'var(--fs-display-m)',
          lineHeight: 'var(--lh-tight)',
          letterSpacing: 'var(--tracking-tight)',
          color: 'var(--text-strong)',
          margin: 0,
        }}>{title}</h2>
        {action && <div style={{ flexShrink: 0 }}>{action}</div>}
      </div>
    </div>
  );
}
