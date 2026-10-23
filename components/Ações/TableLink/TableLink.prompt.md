TableLink from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.TableLink` (bundle loaded from the root `_ds_bundle.js`).

A ação dentro de uma célula — "Abrir", "Ver processo". Sublinhado e na cor de
acento, sem virar botão: numa tabela densa um botão por linha vira ruído.

## Props

```ts
interface TableLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}
```

## Examples

### AcaoPorLinha

```jsx
() => {
  return (
    <div style={{ width: '28rem' }}>
      <TableScroll>
        <Table>
          <thead><tr><th>Documento</th><th>Emitido</th><th /></tr></thead>
          <tbody>
            <tr><td>Memorando de KYC</td><td className="mono">28/08 09:20</td><td><TableLink>Baixar</TableLink></td></tr>
            <tr><td>Planilha de evidências</td><td className="mono">28/08 09:20</td><td><TableLink>Baixar</TableLink></td></tr>
            <tr><td>Checklist rastreável</td><td className="mono">28/08 09:21</td><td><TableLink>Abrir</TableLink></td></tr>
          </tbody>
        </Table>
      </TableScroll>
    </div>
  );
}
```
