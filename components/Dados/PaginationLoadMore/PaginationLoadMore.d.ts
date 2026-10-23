import * as React from 'react';

/**
 * PaginationLoadMore — from @nsights/risk-ops-ui@0.1.0.
 */
export interface PaginationLoadMoreProps {
  disabled?: boolean;
  label?: React.ReactNode;
  onLoadMore?: () => void;
}

export declare const PaginationLoadMore: React.ComponentType<PaginationLoadMoreProps>;
