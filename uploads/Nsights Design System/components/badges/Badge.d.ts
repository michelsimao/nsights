import * as React from 'react';

/**
 * Nsights badge — tinted status chips; premium is gold gradient.
 * @startingPoint section="Components" subtitle="Badge — status & semantic chips" viewport="700x150"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'default' */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'premium' | 'critical';
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
