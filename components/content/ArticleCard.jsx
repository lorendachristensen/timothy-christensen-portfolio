import React from 'react';
import { Tag } from '../core/Tag.jsx';

/**
 * ArticleCard — a clip in the work grid. Image slot on top, kicker/tag,
 * headline, outlet+date footer. Hover = 2px black border + hard offset shadow.
 */
export function ArticleCard({
  kind = 'article',
  category,
  title,
  outlet = "The O'Colly",
  date,
  image,
  href = '#',
  target,
  rel,
  style = {},
}) {
  const onEnter = (e) => {
    e.currentTarget.style.transform = 'translate(-3px,-3px)';
    e.currentTarget.style.boxShadow = 'var(--shadow-hard)';
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0,0)';
    e.currentTarget.style.boxShadow = 'none';
  };
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-card)',
        border: '2px solid var(--ink-950)',
        borderRadius: 'var(--radius-sm)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{
        aspectRatio: '16/10',
        background: image ? `#000 center/cover url("${image}")` : 'var(--ink-100)',
        borderBottom: '2px solid var(--ink-950)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <Tag kind={kind}>{kind === 'video' ? '▶ Video' : kind === 'social' ? 'Social' : 'Article'}</Tag>
        </div>
      </div>
      <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {category && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand)' }}>{category}</span>
        )}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: 'var(--fs-h)',
          lineHeight: 1.05,
          letterSpacing: 'var(--tracking-tight)',
          color: 'var(--text-strong)',
          margin: 0,
        }}>{title}</h3>
        <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
          {outlet}{date ? ` · ${date}` : ''}
        </div>
      </div>
    </a>
  );
}
