import React from 'react';

export interface VideoCardProps {
  /** Clip title. */
  title: string;
  /** Sub-meta line, e.g. "Press conference · Mar 2026". */
  meta?: string;
  /** Duration badge, e.g. "0:47". */
  duration?: string;
  /** Optional thumbnail URL. */
  image?: string;
  href?: string;
  style?: React.CSSProperties;
}

/** Horizontal video/press-clip row with play badge + duration. */
export function VideoCard(props: VideoCardProps): JSX.Element;
