import * as React from 'react';

/**
 * ResultRow — from @nsights/risk-ops-ui@0.1.0.
 */
export interface ResultRowProps {
/** Link ou botão à direita do badge — "Abrir", "Repetir". */
  action?: React.ReactNode;
  badge?: React.ReactNode;
  /** Detalhe revelado sob a linha quando `open`. */
  children?: React.ReactNode;
  /** Os fatos da linha; renderizados numa só linha, separados por " · ". */
  facts?: React.ReactNode[];
  /** SVG de traço, 16px. Fica no quadrado roxo à esquerda. */
  icon: React.ReactNode;
  onOpen?: () => void;
  open?: boolean;
  title: React.ReactNode;
}

export declare const ResultRow: React.ComponentType<ResultRowProps>;
