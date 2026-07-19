import React from 'react';

export interface StatBlockProps {
  /** Big display figure, e.g. "40+". */
  value: string;
  /** Uppercase mono label beneath. */
  label: string;
  /** Tune label color for dark backgrounds. @default false */
  inverse?: boolean;
  style?: React.CSSProperties;
}

/** Large display stat + label for the resume/about page. */
export function StatBlock(props: StatBlockProps): JSX.Element;
