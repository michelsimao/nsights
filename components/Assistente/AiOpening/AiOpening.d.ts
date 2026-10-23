import * as React from 'react';

/**
 * AiOpening — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiOpeningProps {
  /** Saudação em uma frase curta ("Diga o que consultar."). */
  greeting: React.ReactNode;
  /** Linha de apoio: o que o agente faz e o que acontece antes da cobrança. */
  lede?: React.ReactNode;
  /** O composer (`AiAsk`) e o que mais vier logo abaixo da linha de apoio. */
  children?: React.ReactNode;
  /** Selo de confiança com escudo, logo abaixo do composer. */
  trust?: React.ReactNode;
  /** Rótulo em caixa alta acima dos atalhos. */
  startersLabel?: string;
  starters?: AiStarter[];
  /** Starter clicado — preencha o campo do composer; nada é enviado. */
  onPick?: (prompt: string) => void;
  /** Conteúdo depois dos starters (catálogo de consultas, avisos do plano). */
  footer?: React.ReactNode;
}

export declare const AiOpening: React.ComponentType<AiOpeningProps>;
