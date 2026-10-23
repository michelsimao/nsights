import * as React from 'react';

/**
 * PaginationPrevNext — from @nsights/risk-ops-ui@0.1.0.
 */
export interface PaginationPrevNextProps {
  /** Resumo à esquerda ("Exibindo 1–20 de 132"). */
  info?: React.ReactNode;
  onChange?: (page: number) => void;
  /** 1-based. */
  page: number;
  pages: number;
}

export declare const PaginationPrevNext: React.ComponentType<PaginationPrevNextProps>;
