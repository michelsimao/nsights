import * as React from 'react';

/**
 * Avatar — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AvatarProps {
  /** Rótulo acessível. Sem ele a marca sai `aria-hidden`, como o app faz quando o nome está ao lado. */
  label?: string;
  /** Monograma explícito (ex.: vindo da fonte). Sem ele, derivamos das iniciais das duas primeiras palavras. */
  monogram?: string;
  name: string;
  /** URL do logotipo — vira `background-image` com a classe `entity-logo`, o mesmo truque do app. */
  src?: string;
  variant?: "mark" | "monogram" | "recent";
}

export declare const Avatar: React.ComponentType<AvatarProps>;
