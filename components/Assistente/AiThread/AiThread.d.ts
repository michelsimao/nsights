import * as React from 'react';

/**
 * AiThread — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiThreadProps {
  children: React.ReactNode;
  /** Nome da conversa para leitor de tela. */
  label?: string;
}

export declare const AiThread: React.ComponentType<AiThreadProps>;
