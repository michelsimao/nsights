import * as React from 'react';

/**
 * Meter — from @nsights/risk-ops-ui@0.1.0.
 */
export interface MeterProps {
  /** Consultas concluídas. */
  done: number;
  /** Rótulo acessível do progresso ("Progresso da análise de ACME"). */
  label: string;
  /** O estágio atual, à esquerda da legenda. */
  stage: string;
  /** Consultas planejadas. Zero significa "ainda montando o plano". */
  total: number;
  unit?: string;
}

export declare const Meter: React.ComponentType<MeterProps>;
