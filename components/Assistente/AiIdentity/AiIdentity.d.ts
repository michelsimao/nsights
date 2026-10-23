import * as React from 'react';

/**
 * AiIdentity — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiIdentityProps {
  /** Nome do agente, ex.: "Agente de Consultas". */
  name: string;
  /** Estado em palavras: "pronto", "respondendo…". Sem ele, só a marca e o nome. */
  state?: React.ReactNode;
}

export declare const AiIdentity: React.ComponentType<AiIdentityProps>;
