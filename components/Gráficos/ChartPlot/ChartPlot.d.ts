import * as React from 'react';

/**
 * ChartPlot — from @nsights/risk-ops-ui@0.1.0.
 */
export interface ChartPlotProps {
  /** Rótulos do eixo X, na ordem; o CSS os espalha com `justify-content: space-between`. */
  axis?: string[];
  /** O SVG do gráfico. */
  children: React.ReactNode;
}

export declare const ChartPlot: React.ComponentType<ChartPlotProps>;
