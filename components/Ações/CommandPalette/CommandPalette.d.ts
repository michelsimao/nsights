import * as React from 'react';

/**
 * CommandPalette — from @nsights/risk-ops-ui@0.1.0.
 */
export interface CommandPaletteProps {
  items: CommandItem[];
  onClose?: () => void;
  open: boolean;
  placeholder?: string;
}

export declare const CommandPalette: React.ComponentType<CommandPaletteProps>;
