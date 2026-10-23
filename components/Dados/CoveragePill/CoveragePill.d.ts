import * as React from 'react';

/**
 * CoveragePill — from @nsights/risk-ops-ui@0.1.0.
 */
export interface CoveragePillProps {
  children: React.ReactNode;
  state: "done" | "running" | "queued" | "failed";
}

export declare const CoveragePill: React.ComponentType<CoveragePillProps>;
