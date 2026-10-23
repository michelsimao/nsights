import * as React from 'react';

/**
 * Checkbox — from @nsights/risk-ops-ui@0.1.0.
 * @replaces input[type=checkbox]
 */
export interface CheckboxProps {
  checked?: boolean;
  /** Linha miúda sob o rótulo — a dica de escopo da consulta. */
  description?: React.ReactNode;
  disabled?: boolean;
  /** Glifo de categoria no quadradinho roxo (`.si`), SVG de traço. Sem ele a linha encolhe para duas colunas. */
  icon?: React.ReactNode;
  /** Marcação parcial ("2 de 4"). Anuncia como `mixed` para leitores de tela. */
  indeterminate?: boolean;
  label: React.ReactNode;
  name?: string;
  onChange?: (checked: boolean) => void;
  value?: string;
}

export declare const Checkbox: React.ComponentType<CheckboxProps>;
