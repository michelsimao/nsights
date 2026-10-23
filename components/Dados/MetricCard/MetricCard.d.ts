import * as React from 'react';

/**
 * MetricCard — from @nsights/risk-ops-ui@0.1.0.
 */
export interface MetricCardProps {
  hint?: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
}

export declare const MetricCard: React.ComponentType<MetricCardProps>;
