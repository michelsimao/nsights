import * as React from 'react';

/**
 * SelectableCard — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SelectableCardProps {
  description?: React.ReactNode;
  /** Ícone à esquerda do cabeçalho. Alternativa a `intensity`. */
  glyph?: React.ReactNode;
  /** Ressalva em texto miúdo, sob a descrição. */
  hint?: React.ReactNode;
  /** 1 a 3 — quantas barrinhas acendem. */
  intensity?: 1 | 2 | 3;
  onSelect?: () => void;
  selected?: boolean;
  title: React.ReactNode;
}

export declare const SelectableCard: React.ComponentType<SelectableCardProps>;
