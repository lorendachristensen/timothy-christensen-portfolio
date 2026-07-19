import React from 'react';

/**
 * VideoCard — horizontal media row for press-conference / highlight clips.
 * Thumbnail with a play badge on the left, meta on the right.
 */
export function VideoCard({ title, meta, duration, image, href = '#', style = {} }) {
  return (
    <a
      href={href}
      style={{
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
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-soft)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface-card)')}
    >
      <div style={{
        position: 'relative',
        width: '150px',
        flexShrink: 0,
        aspectRatio: '16/9',
        background: image ? `#000 center/cover url("${image}")` : 'var(--ink-900)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          width: '38px', height: '38px', borderRadius: '999px',
          background: 'var(--brand)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', paddingLeft: '3px',
        }}>▶</span>
        {duration && (
          <span style={{
            position: 'absolute', bottom: '6px', right: '6px',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
            background: 'rgba(10,10,11,0.85)', color: '#fff', padding: '2px 5px', borderRadius: '2px',
          }}>{duration}</span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand)' }}>Video</span>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
          fontSize: '1.25rem', lineHeight: 1.05, letterSpacing: 'var(--tracking-tight)',
          color: 'var(--text-strong)', margin: 0,
        }}>{title}</h3>
        {meta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{meta}</span>}
      </div>
    </a>
  );
}
