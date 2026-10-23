import * as React from 'react';

/**
 * Icon — from @nsights/risk-ops-ui@0.1.0.
 */
export interface IconProps {
  /** Só quando o ícone É a informação. Vazio = decorativo. */
  label?: string;
  name: unknown;
  /** Lado do quadrado em px. 16 acompanha texto corrido. */
  size?: number;
}

export declare const Icon: React.ComponentType<IconProps>;
