import * as React from 'react';

/**
 * DataPanel — from @nsights/risk-ops-ui@0.1.0.
 */
export interface DataPanelProps {
  children: React.ReactNode;
  /** Barra inferior: paginação, totais, "atualizado há". */
  footer?: React.ReactNode;
  /** Canto direito do cabeçalho, em texto pequeno. */
  meta?: React.ReactNode;
  title: string;
}

export declare const DataPanel: React.ComponentType<DataPanelProps>;
