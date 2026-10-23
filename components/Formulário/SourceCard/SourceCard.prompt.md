SourceCard from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.SourceCard` (bundle loaded from the root `_ds_bundle.js`).

O cartão de uma fonte na seleção de fontes.

O nome exibido nunca é o do fornecedor — o produto é white-label e o catálogo
é a fonte da verdade do rótulo. Trate o título como um nome de capacidade
("Processos judiciais"), não de vendor.

## Props

```ts
interface SourceCardProps {
  /** Cobertura, custo, pílulas de estado. */
  children?: React.ReactNode;
  /** Checkbox ou switch à direita do título. */
  control?: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  title: React.ReactNode;
}
```

## Examples

### Fonte

```jsx
() => {
  return (
    <div style={{ width: '22rem' }}>
      <SourceCard
        control={<label className="source-toggle"><input defaultChecked readOnly type="checkbox" /><span>Incluída</span></label>}
        description="Processos nos tribunais estaduais e federais, com movimentações e valor da causa."
        selected
        title="Processos judiciais"
      >
        <CoveragePills>
          <CoveragePill state="done">27 tribunais</CoveragePill>
          <CoveragePill state="queued">4 em fila</CoveragePill>
        </CoveragePills>
      </SourceCard>
    </div>
  );
}
```

## Related

`SourceCardGrid`
