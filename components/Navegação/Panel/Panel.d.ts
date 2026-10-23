import * as React from 'react';

/**
 * Panel — from @nsights/risk-ops-ui@0.1.0.
 */
export interface PanelProps {
  children: React.ReactNode;
  /** Uma linha sob o título. */
  description?: React.ReactNode;
  /** Pílula roxa à direita do cabeçalho. */
  tag?: React.ReactNode;
  title?: React.ReactNode;
}

export declare const Panel: React.ComponentType<PanelProps>;
