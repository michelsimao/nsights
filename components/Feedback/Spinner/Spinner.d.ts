import * as React from 'react';

/**
 * Spinner — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SpinnerProps {
  /** Texto visível ao lado do anel ("Consultando Receita Federal…"). */
  label?: string;
}

export declare const Spinner: React.ComponentType<SpinnerProps>;
