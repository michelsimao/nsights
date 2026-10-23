import * as React from 'react';

/**
 * RangeSlider — from @nsights/risk-ops-ui@0.1.0.
 */
export interface RangeSliderProps {
  /** Formatador pt-BR dos valores impressos. Padrão: duas casas decimais. */
  format?: (value: number) => string;
  /** Nome da grandeza ("Faixa de spread sobre CDI") para o rótulo acessível. */
  label: string;
  maximum: number;
  minimum: number;
  points: RangePoint[];
  /** Valor recomendado — desenha o marcador e a legenda "Ponto recomendado". */
  recommendation?: number;
  /** Unidade ou benchmark ("% a.a.", "CDI +") impressa junto à recomendação. */
  unit?: string;
}

export declare const RangeSlider: React.ComponentType<RangeSliderProps>;
