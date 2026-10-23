import * as React from 'react';

/**
 * Nsights button — flat solid primary, hairline secondary, tinted ghost, gold gradient premium.
 * @startingPoint section="Components" subtitle="Button — primary, secondary, ghost, gold" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  /** @default 'md' */
  size?: 'md' | 'sm';
  /** Square padding for a lone icon child. @default false */
  iconOnly?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
