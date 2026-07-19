import React from 'react';

/**
 * Button — the brand's primary action. Square-edged, condensed uppercase label.
 * variant: 'primary' | 'secondary' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: '12px', padding: '7px 14px', letterSpacing: '0.08em' },
    md: { fontSize: '14px', padding: '11px 22px', letterSpacing: '0.08em' },
    lg: { fontSize: '16px', padding: '15px 30px', letterSpacing: '0.06em' },
  };
  const variants = {
    primary: {
      background: 'var(--brand)',
      color: 'var(--text-on-brand)',
      border: '2px solid var(--brand)',
    },
    secondary: {
      background: 'var(--ink-950)',
      color: 'var(--white)',
      border: '2px solid var(--ink-950)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-950)',
      border: '2px solid var(--ink-950)',
    },
  };
  const Tag = as;
  return (
    <Tag
      style={{
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
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onMouseEnter={(e) => {
        if (variant === 'primary') e.currentTarget.style.background = 'var(--brand-hover)';
        if (variant === 'ghost') { e.currentTarget.style.background = 'var(--ink-950)'; e.currentTarget.style.color = 'var(--white)'; }
        if (variant === 'secondary') e.currentTarget.style.background = 'var(--ink-800)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = variants[variant].background;
        e.currentTarget.style.color = variants[variant].color;
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
