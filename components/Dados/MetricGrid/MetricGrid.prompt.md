MetricGrid from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.MetricGrid` (bundle loaded from the root `_ds_bundle.js`).

A faixa de números do topo de um painel: quatro colunas separadas por fios de
1px, cada uma com um filete colorido no topo.

O grid é que desenha as divisórias (fundo na cor da borda, `gap: 1px`), então
os `MetricTile` vão diretamente aqui dentro — nada de wrapper no meio.

## Props

```ts
interface MetricGridProps {
  children: React.ReactNode;
}
```

## Examples

### Faixa

```jsx
() => {
  return (
    <div style={{ width: '46rem' }}>
      <MetricGrid>
        <MetricTile hint="+18% sobre os 30 dias anteriores" label="Análises no período" tone="accent" value="1.284" />
        <MetricTile hint="mediana 47s" label="Tempo até o veredito" value="52s" />
        <MetricTile hint="4 fontes com falha recorrente" label="Com lacuna de cobertura" tone="warning" value="96" />
        <MetricTile hint="exigem revisão humana" label="Veto" tone="danger" value="7" />
      </MetricGrid>
    </div>
  );
}
```
