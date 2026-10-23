import * as React from 'react';

/**
 * Table — from @nsights/risk-ops-ui@0.1.0.
 * @replaces table
 */
export interface TableProps {
  children: React.ReactNode;
  variant?: "ledger" | "bare";
}

export declare const Table: React.ComponentType<TableProps>;
