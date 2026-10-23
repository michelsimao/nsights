import * as React from 'react';

/**
 * SourceCard — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SourceCardProps {
  /** Cobertura, custo, pílulas de estado. */
  children?: React.ReactNode;
  /** Checkbox ou switch à direita do título. */
  control?: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  title: React.ReactNode;
}

export declare const SourceCard: React.ComponentType<SourceCardProps>;
