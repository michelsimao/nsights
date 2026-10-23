import * as React from 'react';

/**
 * Popover — from @nsights/risk-ops-ui@0.1.0.
 */
export interface PopoverProps {
  /** `end` alinha o painel à direita — para gatilhos rentes à borda da tela. */
  align?: "start" | "end";
  children: React.ReactNode;
  /** Ações do rodapé, separadas por um fio de borda. */
  footer?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  /** Nomeia o painel (`aria-label` do dialog) e vira o cabeçalho visível. */
  title: string;
  /** Linha forte do gatilho. */
  trigger: React.ReactNode;
  /** Linha pequena sob o gatilho — o resumo do estado atual. */
  triggerDetail?: React.ReactNode;
}

export declare const Popover: React.ComponentType<PopoverProps>;
