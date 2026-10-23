import * as React from 'react';

/**
 * Nsights text input — card bg, hairline border, accent focus ring.
 * @startingPoint section="Components" subtitle="Input — text field with optional label" viewport="700x150"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional .ns-label rendered above the field. */
  label?: string;
}
export declare function Input(props: InputProps): JSX.Element;
