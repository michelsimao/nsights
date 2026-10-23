ChartLegend from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ChartLegend` (bundle loaded from the root `_ds_bundle.js`).

A legenda de linhas do gráfico de tendência.

O CSS pinta as amostras por posição: a primeira é traço cheio no accent, a
segunda é tracejada cinza. Por isso o tipo trava em uma ou duas entradas — a
principal e a de comparação; um terceiro item ficaria sem cor própria e
mentiria sobre o desenho.

## Props

```ts
interface ChartLegendProps {
  /** ["Iniciadas"] ou ["Iniciadas", "Concluídas"] — na ordem das linhas. */
  items: [string] | [string, string];
}
```

## Examples

### Series

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.6rem', justifyItems: 'start' }}>
      <ChartLegend items={['Análises iniciadas']} />
      <ChartLegend items={['Iniciadas', 'Concluídas']} />
    </div>
  );
}
```
