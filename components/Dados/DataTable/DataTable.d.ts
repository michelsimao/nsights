import * as React from 'react';

/**
 * DataTable — from @nsights/risk-ops-ui@0.1.0.
 */
export interface DataTableProps {
  columns: DataTableColumn<Row>[];
  emptyMessage?: string;
  /** Filtros extras da faixa, no padrão do app: `<label><span>Rótulo</span><select/></label>`. */
  filters?: React.ReactNode;
  onPageChange?: (page: number) => void;
  onSearchChange?: (value: string) => void;
  onSelectedChange?: (ids: string[]) => void;
  onSortChange?: (sort: DataTableSort | undefined) => void;
  /** Página atual, base zero — como o estado interno das tabelas do app. */
  page?: number;
  pageSize?: number;
  rows: Row[];
  search?: string;
  searchAriaLabel?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  /** Presente (mesmo vazio) liga a coluna de seleção em lote — controlada. */
  selected?: string[];
  /** Nome acessível da caixa de cada linha; sem ele, usa o `id`. */
  selectionLabel?: (row: Row) => string;
  sort?: DataTableSort;
}

export declare const DataTable: React.ComponentType<DataTableProps>;
