import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Render as a different element, e.g. 'a' for links. @default 'button' */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}

/**
 * Primary action button — condensed uppercase Oswald label, square edges.
 * @startingPoint section="Core" subtitle="Broadcast-style action button" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
