ChartPlot from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ChartPlot` (bundle loaded from the root `_ds_bundle.js`).

A moldura de plotagem do painel de tendência: grade horizontal discreta
(pintada pelo CSS, sem tinta de eixo) e rótulos do eixo X distribuídos de
ponta a ponta embaixo do desenho.

O filho é o SVG do chamador, com `viewBox="0 0 720 184"` e
`preserveAspectRatio="none"` — a moldura fixa a altura (11rem) e estica a
largura. Os traços têm classes próprias: `advisory-chart-started` (linha
cheia no accent), `advisory-chart-completed` (tracejada cinza, a série de
comparação) e `advisory-chart-area` (área sob a linha principal; exige um
`<linearGradient id="advisory-area">` nos defs do SVG).

## Props

```ts
interface ChartPlotProps {
  /** Rótulos do eixo X, na ordem; o CSS os espalha com `justify-content: space-between`. */
  axis?: string[];
  /** O SVG do gráfico. */
  children: React.ReactNode;
}
```

## Examples

### Area

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <ChartPlot axis={['mar', 'abr', 'mai', 'jun', 'jul', 'ago']}>
        <svg preserveAspectRatio="none" style={{ display: 'block', height: '7rem', width: '100%' }} viewBox="0 0 100 40">
          <polyline fill="none" points="0,32 20,28 40,30 60,18 80,14 100,8" stroke="#7024c7" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <circle cx="100" cy="8" fill="#7024c7" r="2" />
        </svg>
      </ChartPlot>
    </div>
  );
}
```
