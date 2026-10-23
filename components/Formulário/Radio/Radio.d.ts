import * as React from 'react';

/**
 * Radio — from @nsights/risk-ops-ui@0.1.0.
 * @replaces input[type=radio]
 */
export interface RadioProps {
  checked?: boolean;
  /** Linha miúda sob o rótulo — consequência da escolha, custo, ressalva. */
  description?: React.ReactNode;
  disabled?: boolean;
  /** Glifo de categoria no quadradinho roxo (`.si`), SVG de traço. Sem ele a linha encolhe para duas colunas. */
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** O mesmo em todas as opções do grupo — é o que faz o navegador tratá-las como exclusivas. */
  name: string;
  onSelect?: (value: string) => void;
  value: string;
}

export declare const Radio: React.ComponentType<RadioProps>;
