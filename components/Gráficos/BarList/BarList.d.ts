import * as React from 'react';

/**
 * BarList — from @nsights/risk-ops-ui@0.1.0.
 */
export interface BarListProps {
  /** Itens da legenda ao pé da lista, quando há mais de um tom em jogo. */
  legend?: { label: string; color?: string; inactive?: boolean; }[];
  rows: BarListRow[];
  /** Título em caixa alta no topo do quadro. */
  title: string;
}

export declare const BarList: React.ComponentType<BarListProps>;
