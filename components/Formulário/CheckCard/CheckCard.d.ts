import * as React from 'react';

/**
 * CheckCard — from @nsights/risk-ops-ui@0.1.0.
 */
export interface CheckCardProps {
  category?: React.ReactNode;
  description?: React.ReactNode;
  onClick?: () => void;
  /** Badge ou ação à direita. */
  side?: React.ReactNode;
  title: React.ReactNode;
}

export declare const CheckCard: React.ComponentType<CheckCardProps>;
