import React from 'react';

export interface BylineProps {
  /** @default 'Timothy Christensen' */
  author?: string;
  /** Publication, e.g. "The O'Colly". */
  outlet?: string;
  /** Formatted date string, e.g. "Mar 14, 2026". */
  date?: string;
  /** e.g. "4 min read". */
  readTime?: string;
  style?: React.CSSProperties;
}

/** Author + outlet + date + read-time metadata row. */
export function Byline(props: BylineProps): JSX.Element;
