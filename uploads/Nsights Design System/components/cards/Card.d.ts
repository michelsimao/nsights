import * as React from 'react';

/**
 * Nsights unified card — bg-card, hairline border, ::before top gradient, accent hover.
 * @startingPoint section="Components" subtitle="Card — unified surface with hover glow" viewport="700x200"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding in px. @default 20 */
  padding?: number | string;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
