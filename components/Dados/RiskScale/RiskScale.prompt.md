RiskScale from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.RiskScale` (bundle loaded from the root `_ds_bundle.js`).

A legenda da grade de risco — como ler as cores.

As duas últimas amostras carregam a distinção que o produto não pode perder:
`clear` é "não incide, verificado"; `unknown` é inconclusivo (tracejado, sem
preenchimento) e não é a mesma coisa. `stale` marca o que foi avaliado sob
redação anterior da regra.

## Props

```ts
interface RiskScaleProps {
items: { label: string; swatch: "aten" | "agrav" | "grave" | "veto" | "clear" | "unknown" | "stale" }[];
  title?: string;
}
```

## Examples

### Legenda

```jsx
() => {
  return (
    <div style={{ width: '40rem' }}>
      <RiskScale items={ITEMS} />
    </div>
  );
}
```
