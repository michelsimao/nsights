import * as React from 'react';

/**
 * Fact — from @nsights/risk-ops-ui@0.1.0.
 */
export interface FactProps {
  hint?: React.ReactNode;
  label: React.ReactNode;
  sign?: "positive" | "negative";
  value: React.ReactNode;
}

export declare const Fact: React.ComponentType<FactProps>;
