import * as React from 'react';

/**
 * RiskVerdict — from @nsights/risk-ops-ui@0.1.0.
 */
export interface RiskVerdictProps {
  /** Bloco à direita: `Facts`, escala, contagens. */
  aside?: React.ReactNode;
  /** O que sustenta a conclusão — parágrafos, uma ou duas frases. */
  children?: React.ReactNode;
  /** O veredito em palavras, ao lado de "Veredito da análise". */
  label: string;
  /** Carimbo em caixa alta à direita do rótulo — "VETO". */
  stamp?: React.ReactNode;
  /** A conclusão, em uma frase. */
  title: React.ReactNode;
  tone?: "veto" | "high" | "unknown" | "run";
}

export declare const RiskVerdict: React.ComponentType<RiskVerdictProps>;
