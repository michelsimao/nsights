import * as React from 'react';

/**
 * AiConfidence — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiConfidenceProps {
  level: "alta" | "provavel" | "extrapolado" | "desconhecido";
  /** Por que esse nível — ex.: "direto do acórdão" ou "sem fonte primária". */
  note?: React.ReactNode;
}

export declare const AiConfidence: React.ComponentType<AiConfidenceProps>;
