import * as React from 'react';

/**
 * PageHeader — from @nsights/risk-ops-ui@0.1.0.
 */
export interface PageHeaderProps {
  action?: React.ReactNode;
  /** Uma ou duas linhas sobre o que a tela faz. */
  description: string;
  /** Rótulo curto em caixa alta acima do título. */
  kicker: string;
  title: string;
}

export declare const PageHeader: React.ComponentType<PageHeaderProps>;
