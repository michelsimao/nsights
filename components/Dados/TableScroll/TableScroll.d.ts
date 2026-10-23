import * as React from 'react';

/**
 * TableScroll — from @nsights/risk-ops-ui@0.1.0.
 */
export interface TableScrollProps {
  ariaLabel?: string;
  children: React.ReactNode;
  variant?: "granular" | "sensitive";
}

export declare const TableScroll: React.ComponentType<TableScrollProps>;
