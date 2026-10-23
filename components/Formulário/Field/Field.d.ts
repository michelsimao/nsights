import * as React from 'react';

/**
 * Field — from @nsights/risk-ops-ui@0.1.0.
 */
export interface FieldProps {
  /** O `input`, `select` ou `textarea`. */
  children: React.ReactNode;
  /** Mensagem de erro de validação. Presente, esconde `validHint`. */
  error?: React.ReactNode;
  /** id da mensagem de feedback — aponte o `aria-describedby` do input para ele. */
  feedbackId?: string;
  hint?: React.ReactNode;
  htmlFor?: string;
  label: React.ReactNode;
  /** Confirmação positiva de validação, ex.: "CNPJ válido — Agropecuária Boa Vista S.A.". */
  validHint?: React.ReactNode;
}

export declare const Field: React.ComponentType<FieldProps>;
