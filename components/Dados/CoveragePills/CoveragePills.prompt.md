CoveragePills from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.CoveragePills` (bundle loaded from the root `_ds_bundle.js`).

Agrupa `CoveragePill` numa faixa que quebra linha.

## Props

```ts
interface CoveragePillsProps {
  children: React.ReactNode;
}
```

## Examples

### Cobertura

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <CoveragePills>
        <CoveragePill state="done">Cadastral</CoveragePill>
        <CoveragePill state="done">Quadro societário</CoveragePill>
        <CoveragePill state="done">Certidões</CoveragePill>
        <CoveragePill state="running">Judicial</CoveragePill>
        <CoveragePill state="running">Protestos</CoveragePill>
        <CoveragePill state="queued">Mídia adversa</CoveragePill>
        <CoveragePill state="queued">Eleitoral</CoveragePill>
        <CoveragePill state="failed">Sanções</CoveragePill>
      </CoveragePills>
    </div>
  );
}
```
