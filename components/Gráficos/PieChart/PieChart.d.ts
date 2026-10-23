import * as React from 'react';

/**
 * PieChart — from @nsights/risk-ops-ui@0.1.0.
 */
export interface PieChartProps {
  data: PieSlice[];
  /** Formata os valores da legenda e do centro (padrão pt-BR). */
  formatValue?: (value: number) => string;
  title?: string;
  /** Palavra sob o total no vão do donut. */
  totalLabel?: string;
}

export declare const PieChart: React.ComponentType<PieChartProps>;
