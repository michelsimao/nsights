import * as React from 'react';

/**
 * Tooltip — from @nsights/risk-ops-ui@0.1.0.
 */
export interface TooltipProps {
  /** `end` alinha a bolha à direita da âncora. */
  align?: "start" | "end";
  /** A âncora. Precisa aceitar `aria-describedby` (qualquer elemento DOM aceita). */
  children: ReactElement<{ 'aria-describedby'?: string; }, string | JSXElementConstructor<any>>;
  label: React.ReactNode;
  /** Força a bolha visível — para specimens e capturas, nunca em produto. */
  open?: boolean;
}

export declare const Tooltip: React.ComponentType<TooltipProps>;
