import * as React from 'react';

/**
 * ChartLegend — from @nsights/risk-ops-ui@0.1.0.
 */
export interface ChartLegendProps {
  /** ["Iniciadas"] ou ["Iniciadas", "Concluídas"] — na ordem das linhas. */
  items: [string] | [string, string];
}

export declare const ChartLegend: React.ComponentType<ChartLegendProps>;
