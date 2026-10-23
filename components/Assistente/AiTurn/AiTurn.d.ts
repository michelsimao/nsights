import * as React from 'react';

/**
 * AiTurn — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiTurnProps {
  /** Substitui o avatar padrão; `null` remove. Só o agente tem avatar por padrão. */
  avatar?: React.ReactNode;
  children: React.ReactNode;
  from: "assistant" | "user";
}

export declare const AiTurn: React.ComponentType<AiTurnProps>;
