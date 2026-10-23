import * as React from 'react';

/**
 * MetricTile — from @nsights/risk-ops-ui@0.1.0.
 */
export interface MetricTileProps {
  /** A linha pequena sob o valor: comparação, período, ressalva. */
  hint?: React.ReactNode;
  label: React.ReactNode;
  tone?: "warning" | "danger" | "neutral" | "accent";
  value: React.ReactNode;
}

export declare const MetricTile: React.ComponentType<MetricTileProps>;
