import * as React from 'react';

/**
 * AiStream — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiStreamProps {
  /** O que já chegou, já renderizado (parágrafos, listas). Vazio mostra os três pontos. */
  children?: React.ReactNode;
  /** Terminou: o `aria-busy` sai e o loader some. */
  done?: boolean;
  /** Falha da rodada, em uma frase. Renderiza a faixa de erro com o botão de repetir. */
  error?: string;
  /** Sem ele a faixa de erro aparece sem botão. */
  onRetry?: () => void;
  /** O que o loader diz ao leitor de tela enquanto nada chegou. */
  pending?: string;
  retryLabel?: string;
}

export declare const AiStream: React.ComponentType<AiStreamProps>;
