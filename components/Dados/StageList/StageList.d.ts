import * as React from 'react';

/**
 * StageList — from @nsights/risk-ops-ui@0.1.0.
 */
export interface StageListProps {
/** Índice do estágio em curso. Os anteriores aparecem concluídos. */
  activeIndex: number;
  /** Segundos decorridos, à direita do título. */
  elapsed?: number;
  /** Uma ou duas frases sobre a espera. */
  lead?: React.ReactNode;
  stages: { hint: string; key: string; label: string }[];
  title: string;
}

export declare const StageList: React.ComponentType<StageListProps>;
