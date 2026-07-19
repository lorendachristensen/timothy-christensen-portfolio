import React from 'react';

export interface SectionHeadingProps {
  /** Orange eyebrow text above the title. */
  kicker?: string;
  /** The section title (rendered uppercase display). */
  title: string;
  /** Optional right-aligned node, e.g. a "View all" Button. */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Section title with kicker + signature 2px underline rule. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
