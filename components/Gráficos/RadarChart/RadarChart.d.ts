import * as React from 'react';

/**
 * RadarChart — from @nsights/risk-ops-ui@0.1.0.
 */
export interface RadarChartProps {
  /** Rótulos dos eixos, em ordem horária a partir do topo. */
  axes: string[];
  /** O teto comum dos eixos. */
  max?: number;
  series: RadarSeries[];
  title?: string;
}

export declare const RadarChart: React.ComponentType<RadarChartProps>;
