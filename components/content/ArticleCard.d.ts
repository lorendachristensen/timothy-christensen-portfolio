import React from 'react';

export interface ArticleCardProps {
  /** Content type, drives the corner tag. @default 'article' */
  kind?: 'article' | 'video' | 'social';
  /** Orange category eyebrow, e.g. "Men's Basketball". */
  category?: string;
  /** Headline. */
  title: string;
  /** Publication. @default "The O'Colly" */
  outlet?: string;
  /** Date string. */
  date?: string;
  /** Optional cover image URL. */
  image?: string;
  href?: string;
  style?: React.CSSProperties;
}

/**
 * A single clip in the work grid — cover, tag, headline, outlet/date.
 * @startingPoint section="Content" subtitle="Portfolio clip card" viewport="380x360"
 */
export function ArticleCard(props: ArticleCardProps): JSX.Element;
