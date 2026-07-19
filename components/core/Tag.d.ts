import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Content-type accent. @default 'topic' */
  kind?: 'article' | 'video' | 'social' | 'topic';
  children?: React.ReactNode;
}

/** Content-type / topic label chip. */
export function Tag(props: TagProps): JSX.Element;
