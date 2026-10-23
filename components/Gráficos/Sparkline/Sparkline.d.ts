import * as React from 'react';

/**
 * Sparkline — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SparklineProps {
  /** O número exibido, já formatado ("+12,4%"). */
  text: string;
  /** Força o tom quando subir não é bom (processos novos, desligamentos). Sem ele, último ponto >= primeiro pinta de alta. */
  tone?: "up" | "down";
  /** A série do período, em ordem cronológica. */
  values: number[];
}

export declare const Sparkline: React.ComponentType<SparklineProps>;
