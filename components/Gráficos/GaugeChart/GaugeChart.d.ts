import * as React from 'react';

/**
 * GaugeChart — from @nsights/risk-ops-ui@0.1.0.
 */
export interface GaugeChartProps {
  /** A palavra sob o valor: o que o número mede ("cobertura", "consumido"). */
  label: string;
  max?: number;
  tone?: "warning" | "success" | "danger" | "accent";
  value: number;
  /** Sobrescreve o texto central; o padrão é a porcentagem inteira. */
  valueText?: string;
}

export declare const GaugeChart: React.ComponentType<GaugeChartProps>;
