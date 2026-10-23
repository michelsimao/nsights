import * as React from 'react';

/**
 * Breadcrumb — from @nsights/risk-ops-ui@0.1.0.
 */
export interface BreadcrumbProps {
  items: ReactNode[];
  /** Arremate sem ênfase depois do último separador (ex.: contagem de resultados). */
  tail?: React.ReactNode;
}

export declare const Breadcrumb: React.ComponentType<BreadcrumbProps>;
