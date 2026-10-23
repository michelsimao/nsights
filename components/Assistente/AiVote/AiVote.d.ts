import * as React from 'react';

/**
 * AiVote — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiVoteProps {
  label?: string;
  /** Copiar a resposta. Sem ele o botão de texto não aparece. */
  onCopy?: () => void;
  /** Gerar a resposta de novo. Sem ele o botão não aparece. */
  onRegenerate?: () => void;
  onVote?: (value: AiVoteValue | null) => void;
  value?: "up" | "down";
}

export declare const AiVote: React.ComponentType<AiVoteProps>;
