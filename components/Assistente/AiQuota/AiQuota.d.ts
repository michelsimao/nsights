import * as React from 'react';

/**
 * AiQuota — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiQuotaProps {
  /** Saldo atual, em créditos. Vira o número grande do hero. */
  available: number;
  /** Rótulo curto acima do número. */
  label?: string;
  /** Renovação e preço do excedente, em uma linha, sob o número. */
  note?: React.ReactNode;
  /** Rótulo em caixa alta do cabeçalho do cartão. */
  eyebrow?: string;
  /** Título do cabeçalho do cartão ("Plano Operacional"). */
  title?: string;
  /** Linhas de detalhe abaixo do hero. */
  items?: AiQuotaItem[];
}

export declare const AiQuota: React.ComponentType<AiQuotaProps>;
