import React from 'react';

/**
 * Byline — author + publication + date + read-time metadata row (mono).
 */
export function Byline({ author = 'Timothy Christensen', outlet, date, readTime, style = {} }) {
  const parts = [outlet, date, readTime].filter(Boolean);
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      ...style,
    }}>
      <span style={{ color: 'var(--text-strong)', fontWeight: 600 }}>By {author}</span>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span aria-hidden style={{ color: 'var(--ink-300)' }}>/</span>
          <span>{p}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
