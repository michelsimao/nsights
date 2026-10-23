import * as React from 'react';

/**
 * KpiCard — from @nsights/risk-ops-ui@0.1.0.
 */
export interface KpiCardProps {
  /** O delta do período com sinal, ex.: "+18%", "-3". */
  delta?: string;
  /** A linha pequena de contexto: comparação, período, ressalva. */
  hint?: React.ReactNode;
  /** Métrica em que subir é ruim: inverte a cor do delta, não o sinal. */
  invert?: boolean;
  label: React.ReactNode;
  /** Série curta para a sparkline, do mais antigo ao mais recente. */
  spark?: number[];
  tone?: "warning" | "danger" | "neutral" | "accent";
  value: React.ReactNode;
}

export declare const KpiCard: React.ComponentType<KpiCardProps>;
