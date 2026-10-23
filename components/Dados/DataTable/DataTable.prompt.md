DataTable from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.DataTable` (bundle loaded from the root `_ds_bundle.js`).

A tabela operacional completa — busca, filtros, contagem, ordenação por
coluna, seleção em lote e paginação — na composição que o app monta na visão
granular de processos e no quadro societário: a faixa `granular-filters` em
cima, a tabela de resultados no meio, a paginação embaixo.

Todo estado é controlado de fora (`search`, `sort`, `selected`, `page`):
a preview estática mostra qualquer estado e o produto decide onde persiste
cada um. O trabalho de dados (filtrar, ordenar, fatiar a página) fica aqui
dentro, porque é sempre igual — o app repete esse mesmo miolo em cada tela.

Regras herdadas do app: mudar busca ou ordenação volta para a página zero
(senão o usuário cai numa página que não existe mais); coluna sem valor
afunda no fim da ordenação em qualquer direção ("ordenar por valor" nunca
enterra as linhas que têm valor); o `aria-sort` só existe no `th` ativo —
o CSS `th[aria-sort] .th-sort` acende o cabeçalho, então um `aria-sort`
"none" acenderia todos.

## Props

```ts
interface DataTableProps {
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
```

## Examples

### ProcessosGranulares

```jsx
() => {
  return (
    <div style={{ width: '58rem' }}>
      <DataTable
        columns={colunasProcessos}
        filters={
          <>
            <label>
              <span>Situação</span>
              <select defaultValue="in_progress">
                <option value="all">Todas</option>
                <option value="in_progress">Em tramitação</option>
                <option value="closed">Encerrados</option>
              </select>
            </label>
            <label>
              <span>Polo</span>
              <select defaultValue="all">
                <option value="all">Todos</option>
                <option value="passive">Passivo</option>
                <option value="active">Ativo</option>
              </select>
            </label>
          </>
        }
        pageSize={5}
        rows={processos}
        searchAriaLabel="Buscar por número, entidade ou assunto"
        searchPlaceholder="Número, entidade ou assunto"
        sort={{ dir: 'desc', key: 'valor' }}
      />
    </div>
  );
};

type Entidade = {
  id: string;
  nome: string;
  cnpj: string;
  consultas: string;
  situacao: 'ativa' | 'alerta' | 'inativa';
  rotulo: string;
};

const entidades: Entidade[] = [
  { id: 'e1', nome: 'Agropecuária Santa Fé Ltda.', cnpj: '12.345.678/0001-90', consultas: '6/6 concluídas', situacao: 'ativa', rotulo: 'Concluída' },
  { id: 'e2', nome: 'Transportadora Vale Verde S.A.', cnpj: '98.765.432/0001-10', consultas: '4/6 concluídas', situacao: 'alerta', rotulo: 'Em execução' },
  { id: 'e3', nome: 'Mineração Serra Alta Ltda.', cnpj: '45.678.912/0001-33', consultas: '6/6 concluídas', situacao: 'alerta', rotulo: 'Com alerta' },
  { id: 'e4', nome: 'Construtora Horizonte Azul Ltda.', cnpj: '23.456.789/0001-55', consultas: '0/6 concluídas', situacao: 'inativa', rotulo: 'Não iniciada' },
];

const colunasEntidades: DataTableColumn<Entidade>[] = [
  { key: 'nome', label: 'Entidade', sortable: true },
  { key: 'cnpj', label: 'CNPJ', render: (e) => <span className="mono">{e.cnpj}</span>, value: (e) => e.cnpj },
  { key: 'consultas', label: 'Consultas' },
  { key: 'situacao', label: 'Situação', render: (e) => <StatusPill status={e.situacao}>{e.rotulo}</StatusPill>, value: (e) => e.rotulo },
];

/** Seleção em lote controlada: duas entidades marcadas, o cabeçalho fica indeterminado. */
```

### SelecaoEmLote

```jsx
() => {
  return (
    <div style={{ width: '46rem' }}>
      <DataTable
        columns={colunasEntidades}
        pageSize={5}
        rows={entidades}
        searchAriaLabel="Buscar por nome ou CNPJ"
        searchPlaceholder="Nome ou CNPJ"
        selected={['e2', 'e3']}
        selectionLabel={(e) => `Selecionar ${e.nome}`}
      />
    </div>
  );
}
```
