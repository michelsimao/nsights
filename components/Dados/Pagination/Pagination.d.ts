import * as React from 'react';

/**
 * Pagination — from @nsights/risk-ops-ui@0.1.0.
 */
export interface PaginationProps {
  ariaLabel?: string;
  /** Resumo à esquerda ("Mostrando 1–20 de 184"), formatado pelo chamador. */
  info?: React.ReactNode;
  onChange?: (page: number) => void;
  /** 1-based. */
  page: number;
  pages: number;
}

export declare const Pagination: React.ComponentType<PaginationProps>;
