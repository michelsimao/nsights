import * as React from 'react';

/**
 * LineChart — from @nsights/risk-ops-ui@0.1.0.
 */
export interface LineChartProps {
  /** Preenche a área sob a linha. Padrão: apenas quando há uma série. */
  area?: boolean;
  /** Formata os valores da régua Y. Padrão: inteiro em pt-BR. */
  formatValue?: (value: number) => string;
  /** Descrição acessível do gráfico inteiro. */
  label: string;
  /** Rótulos do eixo X, um por ponto. */
  labels: string[];
  /** Mostra a legenda de séries acima do desenho. Padrão: quando há mais de uma. */
  legend?: boolean;
  series: LineSeries[];
  /** Versão mais alta para gráficos de linha inteira (classe `profile-chart-wide`). */
  wide?: boolean;
}

export declare const LineChart: React.ComponentType<LineChartProps>;
