import * as React from 'react';

/**
 * FileUpload — from @nsights/risk-ops-ui@0.1.0.
 */
export interface FileUploadProps {
  /** Extensões aceitas pelo input ("csv,.xlsx"). Diga o limite real no `hint`. */
  accept?: string;
  /** Erro do lote inteiro — a faixa vermelha sob a lista. */
  error?: string;
  files?: UploadFile[];
  /** Linha menor sob o título ("ou clique para selecionar (.csv, .xlsx)"). */
  hint?: string;
  /** Rótulo em caixa alta acima da zona. */
  label?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  /** Chamada da zona vazia. */
  title?: string;
}

export declare const FileUpload: React.ComponentType<FileUploadProps>;
