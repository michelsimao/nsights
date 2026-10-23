import * as React from 'react';

/**
 * WizardFooter — from @nsights/risk-ops-ui@0.1.0.
 */
export interface WizardFooterProps {
  /** Ação secundária, à esquerda das principais. */
  back?: React.ReactNode;
  /** Rótulo em caixa alta e o valor: créditos, consultas previstas. */
  meta?: React.ReactNode;
  next?: React.ReactNode;
}

export declare const WizardFooter: React.ComponentType<WizardFooterProps>;
