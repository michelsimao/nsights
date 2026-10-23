import * as React from 'react';

/**
 * Modal — from @nsights/risk-ops-ui@0.1.0.
 * @replaces dialog
 */
export interface ModalProps {
  children: React.ReactNode;
  /** Rótulo em caixa alta acima do título ("Processo judicial"). */
  kicker?: React.ReactNode;
  onClose?: () => void;
  /** Título visível no head e rótulo acessível do diálogo. */
  title: string;
}

export declare const Modal: React.ComponentType<ModalProps>;
