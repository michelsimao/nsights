import * as React from 'react';

/**
 * MultiSelect — from @nsights/risk-ops-ui@0.1.0.
 */
export interface MultiSelectProps {
  /** Mostra a seleção como pílulas removíveis abaixo do gatilho. */
  chips?: boolean;
  /** Rótulo do gatilho quando nada está selecionado (nada = sem filtro). */
  emptyLabel?: string;
  label: string;
  onChange: (values: string[]) => void;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  options: MultiSelectOption[];
  selected: string[];
}

export declare const MultiSelect: React.ComponentType<MultiSelectProps>;
