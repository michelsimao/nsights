import * as React from 'react';

/**
 * VerdictBadge — from @nsights/risk-ops-ui@0.1.0.
 */
export interface VerdictBadgeProps {
  children: React.ReactNode;
  verdict: "high" | "low" | "medium" | "vetoed" | "inconclusive";
}

export declare const VerdictBadge: React.ComponentType<VerdictBadgeProps>;
