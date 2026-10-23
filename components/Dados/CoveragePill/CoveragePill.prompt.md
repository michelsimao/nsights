CoveragePill from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.CoveragePill` (bundle loaded from the root `_ds_bundle.js`).

O estado de uma fonte na cobertura de uma análise.

`failed` não é `done` com ressalva: falha parcial não é cobrada e aparece como
cobertura falha. Use `CoveragePills` para agrupar — as pílulas ocupam a linha
inteira de um grid.

## Props

```ts
interface CoveragePillProps {
  children: React.ReactNode;
  state: "done" | "running" | "queued" | "failed";
}
```

## Examples

### Estados

```jsx
() => {
  return (
    <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
      <CoveragePill state="done">Cadastral</CoveragePill>
      <CoveragePill state="running">Judicial</CoveragePill>
      <CoveragePill state="queued">Mídia</CoveragePill>
      <CoveragePill state="failed">Sanções</CoveragePill>
    </div>
  );
}
```
