import * as React from 'react';

/**
 * WizardProgress — from @nsights/risk-ops-ui@0.1.0.
 */
export interface WizardProgressProps {
/** Índice do passo em que o usuário está. */
  current: number;
  onSelect?: (id: string) => void;
  /** Até que índice já se avançou. Passos acima disso não são clicáveis. */
  reached?: number;
  steps: { id: string; label: string }[];
}

export declare const WizardProgress: React.ComponentType<WizardProgressProps>;
