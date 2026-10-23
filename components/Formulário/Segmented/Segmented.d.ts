import * as React from 'react';

/**
 * Segmented — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SegmentedProps {
ariaLabel: string;
  onSelect?: (id: string) => void;
  options: { icon?: React.ReactNode; id: string; label: React.ReactNode }[];
  value: string;
}

export declare const Segmented: React.ComponentType<SegmentedProps>;
