RadarChart from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.RadarChart` (bundle loaded from the root `_ds_bundle.js`).

Polígono estático para comparar perfis em várias dimensões — a exposição de
uma entidade por família de fonte contra a mediana do setor. O app não tem
radar; desenho novo (`ns-`): grade e raios em `--border`, série com traço
fino de 1.5px e preenchimento quase transparente, pontos com `<title>`
carregando eixo e valor.

A legenda em palavras fica embaixo — cor nunca é o único canal. Eixos
pedem rótulo curto (uma ou duas palavras); texto longo estoura a moldura.

## Props

```ts
interface RadarChartProps {
  /** Rótulos dos eixos, em ordem horária a partir do topo. */
  axes: string[];
  /** O teto comum dos eixos. */
  max?: number;
  series: RadarSeries[];
  title?: string;
}
```

## Examples

### ExposicaoPorDimensao

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: '.55rem', padding: '1.1rem', width: '26rem' }}>
      <RadarChart
        axes={EIXOS}
        series={[
          { label: 'ACME Participações', values: [82, 64, 45, 71, 58, 39] },
          { label: 'Mediana do setor', values: [60, 38, 30, 52, 44, 47] },
        ]}
        title="Exposição por dimensão de risco"
      />
    </div>
  );
}
```
