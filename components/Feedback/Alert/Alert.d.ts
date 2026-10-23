import * as React from 'react';

/**
 * Alert — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AlertProps {
  children: React.ReactNode;
  /** Primeira linha em negrito, quando o aviso tem manchete. */
  title?: React.ReactNode;
  tone?: "warning" | "info" | "success" | "danger";
}

export declare const Alert: React.ComponentType<AlertProps>;
