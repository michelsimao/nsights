import * as React from 'react';

/**
 * BarChart — from @nsights/risk-ops-ui@0.1.0.
 */
export interface BarChartProps {
  /** Nota de leitura sob o gráfico (fonte, recorte). */
  caption?: React.ReactNode;
  /** Rótulos do eixo X (anos, meses, faixas). */
  categories: string[];
  /** Descrição acessível do gráfico inteiro. */
  label: string;
  series: BarSeries[];
}

export declare const BarChart: React.ComponentType<BarChartProps>;
