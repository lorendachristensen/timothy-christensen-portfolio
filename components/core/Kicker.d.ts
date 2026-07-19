import React from 'react';

export interface KickerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show the leading 24px rule. @default true */
  rule?: boolean;
  /** Eyebrow color. @default 'var(--brand)' */
  color?: string;
  children?: React.ReactNode;
}

/** Orange uppercase eyebrow label above headlines. */
export function Kicker(props: KickerProps): JSX.Element;
