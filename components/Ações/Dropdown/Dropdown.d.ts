import * as React from 'react';

/**
 * Dropdown — from @nsights/risk-ops-ui@0.1.0.
 * @replaces select
 */
export interface DropdownProps {
  /** `end` alinha o menu à direita do gatilho — para gatilhos rentes à borda. */
  align?: "start" | "end";
  /** Nome do menu para leitores de tela (o gatilho pode ser só um ícone). */
  ariaLabel: string;
  items: DropdownItem[];
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  /** Conteúdo do botão-gatilho; o chevron o componente acrescenta. */
  trigger: React.ReactNode;
}

export declare const Dropdown: React.ComponentType<DropdownProps>;
