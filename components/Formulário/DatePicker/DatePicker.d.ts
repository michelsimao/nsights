import * as React from 'react';

/**
 * DatePicker — from @nsights/risk-ops-ui@0.1.0.
 */
export interface DatePickerProps {
  label?: string;
  /** Início e fim em ISO (aaaa-mm-dd); `null` limpa. */
  onChange?: (start: string | null, end: string | null) => void;
  onOpenChange?: (open: boolean) => void;
  /** Estado do painel — controlado pelo chamador. */
  open?: boolean;
  presets?: DatePreset[];
  /** Início do período, ISO. */
  value?: string;
  /** Fim do período, ISO. */
  valueEnd?: string;
}

export declare const DatePicker: React.ComponentType<DatePickerProps>;
