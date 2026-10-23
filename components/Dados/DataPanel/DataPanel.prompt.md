DataPanel from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.DataPanel` (bundle loaded from the root `_ds_bundle.js`).

Painel de dados com cabeçalho e rodapé fixos — o invólucro de tabela e lista
nas telas operacionais.

Diferente de `Panel`: aqui o cabeçalho é uma barra cinza com borda, o conteúdo
fica recortado pelo `overflow: hidden` do painel e o rodapé carrega paginação
e totais. Tabela larga vai dentro de `TableScroll`, não solta.

## Props

```ts
interface DataPanelProps {
  children: React.ReactNode;
  /** Barra inferior: paginação, totais, "atualizado há". */
  footer?: React.ReactNode;
  /** Canto direito do cabeçalho, em texto pequeno. */
  meta?: React.ReactNode;
  title: string;
}
```

## Examples

### ComTabela

```jsx
() => {
  return (
    <div style={{ width: '40rem' }}>
      <DataPanel footer={<><span>3 de 128 análises</span><span>Atualizado há 2 min</span></>} meta="Últimas 24 horas" title="Análises recentes">
        <TableScroll>
          <Table>
            <thead><tr><th>Entidade</th><th>Documento</th><th>Situação</th><th>Concluída</th><th /></tr></thead>
            <tbody>
              {ROWS.map(([name, doc, state, label, when]) => (
                <tr key={doc}>
                  <td>{name}</td>
                  <td className="mono">{doc}</td>
                  <td><StatusPill status={state as 'complete'}>{label}</StatusPill></td>
                  <td className="mono">{when}</td>
                  <td><TableLink>Abrir</TableLink></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScroll>
      </DataPanel>
    </div>
  );
}
```
