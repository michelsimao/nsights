MetricTile from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.MetricTile` (bundle loaded from the root `_ds_bundle.js`).

Um número da faixa: rótulo em caixa alta, valor grande em Geist Mono e uma
linha de contexto.

O filete no topo é o tom — `danger` para o que exige ação, `accent` para o
indicador principal. Sem contexto em `hint` um número sozinho não informa: diga
de quanto era antes, ou de que período é.

## Props

```ts
interface MetricTileProps {
  /** A linha pequena sob o valor: comparação, período, ressalva. */
  hint?: React.ReactNode;
  label: React.ReactNode;
  tone?: "warning" | "danger" | "neutral" | "accent";
  value: React.ReactNode;
}
```

## Examples

### Tons

```jsx
() => {
  return (
    <div style={{ width: '46rem' }}>
      <MetricGrid>
        <MetricTile hint="indicador principal" label="Accent" tone="accent" value="1.284" />
        <MetricTile hint="sem filete colorido" label="Neutral" value="52s" />
        <MetricTile hint="merece olhar" label="Warning" tone="warning" value="96" />
        <MetricTile hint="exige ação" label="Danger" tone="danger" value="7" />
      </MetricGrid>
    </div>
  );
}
```
