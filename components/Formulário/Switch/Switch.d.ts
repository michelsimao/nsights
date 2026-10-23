import * as React from 'react';

/**
 * Switch — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label: React.ReactNode;
  onChange?: (checked: boolean) => void;
  /** O estado em palavras, ex.: "Ativo" / "Inativo". */
  stateText?: React.ReactNode;
}

export declare const Switch: React.ComponentType<SwitchProps>;
