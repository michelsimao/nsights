import * as React from 'react';

/**
 * RadioGroup — from @nsights/risk-ops-ui@0.1.0.
 */
export interface RadioGroupProps {
  /** As opções `Radio`, já com o `name` comum. */
  children: React.ReactNode;
  legend: React.ReactNode;
}

export declare const RadioGroup: React.ComponentType<RadioGroupProps>;
