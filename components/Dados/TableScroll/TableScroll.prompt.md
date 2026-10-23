TableScroll from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.TableScroll` (bundle loaded from the root `_ds_bundle.js`).

O invólucro que rola a tabela na horizontal. Recebe foco pelo teclado (e o
anel roxo do sistema), porque conteúdo que rola precisa ser alcançável sem
mouse. `ariaLabel` nomeia a região rolável para o leitor de tela — o extrato
de créditos faz isso no app.

`variant="sensitive"` embrulha a tabela de sensíveis (`Table variant="bare"`):
cabeçalho com fundo, colunas que absorvem a largura, nada de scroll.
`variant="granular"` zera a largura mínima da `result-table` — a visão
granular quer caber inteira na tela.

## Props

```ts
interface TableScrollProps {
  ariaLabel?: string;
  children: React.ReactNode;
  variant?: "granular" | "sensitive";
}
```

## Examples

### Rolagem

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <TableScroll>
        <Table>
          <thead><tr><th>Sócio</th><th>Documento</th><th>Participação</th><th>Entrada</th><th>Cargo</th></tr></thead>
          <tbody>
            <tr><td>Helena Barros Vasconcelos</td><td className="mono">***.456.789-**</td><td className="mono">42,0%</td><td className="mono">03/2011</td><td>Administradora</td></tr>
            <tr><td>Rodrigo Antunes Mendes</td><td className="mono">***.123.456-**</td><td className="mono">33,5%</td><td className="mono">03/2011</td><td>Sócio</td></tr>
            <tr><td>Meridiano Holding Ltda.</td><td className="mono">98.765.432/0001-11</td><td className="mono">24,5%</td><td className="mono">07/2019</td><td>Sócia</td></tr>
          </tbody>
        </Table>
      </TableScroll>
    </div>
  );
}
```
