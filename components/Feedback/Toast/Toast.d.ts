import * as React from 'react';

/**
 * Toast — from @nsights/risk-ops-ui@0.1.0.
 */
export interface ToastProps {
  /** Ação curta ("Desfazer", "Tentar de novo") — normalmente um botão pequeno. */
  action?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  title?: string;
  tone?: "warning" | "info" | "success" | "danger";
}

export declare const Toast: React.ComponentType<ToastProps>;
