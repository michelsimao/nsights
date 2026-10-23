import * as React from 'react';

/**
 * GraphTooltip — from @nsights/risk-ops-ui@0.1.0.
 */
export interface GraphTooltipProps {
  /** Rótulo da banda em caixa alta — "Sócios", "Coligadas", "Alvo da análise". */
  band?: string;
  /** Cor do ponto da banda. Padrão: o acento. */
  bandColor?: string;
  /** Os vínculos: um `ul` de relações ou um `p` quando não há vínculo desenhado. */
  children?: React.ReactNode;
  /** Posicionamento dentro do contêiner relativo do caller. */
  style?: CSSProperties;
  title: string;
}

export declare const GraphTooltip: React.ComponentType<GraphTooltipProps>;
