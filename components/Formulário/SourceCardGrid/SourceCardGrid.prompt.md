SourceCardGrid from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.SourceCardGrid` (bundle loaded from the root `_ds_bundle.js`).

Duas colunas de `SourceCard`, uma só em telas estreitas.

## Props

```ts
interface SourceCardGridProps {
  children: React.ReactNode;
}
```

## Examples

### Selecao

```jsx
() => {
  return (
    <div style={{ width: '36rem' }}>
      <SourceCardGrid>
        <SourceCard control={<label className="source-toggle"><input defaultChecked readOnly type="checkbox" /><span>Incluída</span></label>} description="Situação, natureza jurídica, CNAE e endereço." selected title="Cadastral" />
        <SourceCard control={<label className="source-toggle"><input defaultChecked readOnly type="checkbox" /><span>Incluída</span></label>} description="Sócios, participações e empresas do grupo." selected title="Quadro societário" />
        <SourceCard control={<label className="source-toggle"><input readOnly type="checkbox" /><span>Incluir</span></label>} description="Menções em mídia com juízo negativo." title="Mídia adversa" />
        <SourceCard control={<label className="source-toggle"><input readOnly type="checkbox" /><span>Incluir</span></label>} description="Listas restritivas nacionais e internacionais." title="Sanções" />
      </SourceCardGrid>
    </div>
  );
}
```
