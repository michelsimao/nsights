import * as React from 'react';

/**
 * ChartShell — from @nsights/risk-ops-ui@0.1.0.
 */
export interface ChartShellProps {
  children: React.ReactNode;
  /** Contagem ou recorte à direita do título, nunca estado. */
  meta?: React.ReactNode;
  /** Como ler o gráfico — aparece antes do desenho. */
  note?: React.ReactNode;
  title: React.ReactNode;
  /** Ocupa a linha inteira da grade de gráficos (classe `timeline-card`). */
  wide?: boolean;
}

export declare const ChartShell: React.ComponentType<ChartShellProps>;
