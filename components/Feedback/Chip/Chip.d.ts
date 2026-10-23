import * as React from 'react';

/**
 * Chip — from @nsights/risk-ops-ui@0.1.0.
 */
export interface ChipProps {
  children: React.ReactNode;
  /** Contagem à direita do rótulo, em tabular-nums. */
  count?: number;
  onClick?: () => void;
  /** Estado do filtro. Só passe em chip clicável. */
  pressed?: boolean;
  /** Ponto de cor à esquerda. Sem tom, o chip não mostra ponto. */
  tone?: "attention" | "critical" | "gap" | "regular" | "group" | "partners" | "related";
}

export declare const Chip: React.ComponentType<ChipProps>;
