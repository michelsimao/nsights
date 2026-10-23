import * as React from 'react';

/**
 * ProgressBar — from @nsights/risk-ops-ui@0.1.0.
 */
export interface ProgressBarProps {
  /** Itens concluídos. */
  done: number;
  /** Itens que falharam. */
  failed?: number;
  /** Itens em execução agora. */
  running?: number;
  /** Total planejado da rodada. */
  total: number;
  /** Palavra do contador e da legenda ("concluídas", "enviados"). */
  unit?: string;
}

export declare const ProgressBar: React.ComponentType<ProgressBarProps>;
