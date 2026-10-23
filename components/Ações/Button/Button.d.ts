import * as React from 'react';

/**
 * Button — from @nsights/risk-ops-ui@0.1.0.
 * @replaces button
 */
export interface ButtonProps {
children: React.ReactNode;
  /** SVG de 16px à esquerda do rótulo. Leva className="button-icon". Ignorado enquanto `loading`. */
  icon?: React.ReactNode;
  /** Troca o ícone por um spinner e desabilita o botão. */
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
  style?: React.CSSProperties;
}

export declare const Button: React.ComponentType<ButtonProps>;
