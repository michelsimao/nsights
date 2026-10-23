BarChart from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.BarChart` (bundle loaded from the root `_ds_bundle.js`).

Colunas agrupadas por categoria, sem eixo Y: o valor exato fica escrito no
topo de cada coluna (números tabulares) e a altura é proporcional ao maior
valor do gráfico — a régua é a comparação, não uma escala a decifrar.

A cor de cada coluna e da bolinha da legenda é chapada (nunca degradê) e vem
da paleta de séries da casa na ordem fixa; `color` existe para quando a série
tem cor semântica própria (ex.: saída societária). O mínimo de 2px do CSS
mantém o ano com valor zero visível — ausência de barra leria como falta de
dado, não como zero.

O contêiner é `ns-barchart-chart` de propósito: a classe original do app
(`qsa-movement-chart`) foi REDEFINIDA pelo próprio app quando o gráfico de
movimentações virou Highcharts (globals.css:858 — block/relative). A regra
flex aposentada (globals.css:741) vive aqui verbatim, com o nome ns-.

## Props

```ts
interface BarChartProps {
  /** Nota de leitura sob o gráfico (fonte, recorte). */
  caption?: React.ReactNode;
  /** Rótulos do eixo X (anos, meses, faixas). */
  categories: string[];
  /** Descrição acessível do gráfico inteiro. */
  label: string;
  series: BarSeries[];
}
```

## Examples

### MovimentacoesSocietarias

```jsx
() => {
  return (
    <div style={{ width: '30rem' }}>
      <BarChart
        caption="Entradas e saídas do quadro societário registradas na Junta Comercial."
        categories={['2019', '2020', '2021', '2022', '2023', '2024', '2025']}
        label="Movimentações societárias por ano, de 2019 a 2025"
        series={[
          { label: 'Entradas', values: [2, 1, 3, 0, 4, 2, 1] },
          { label: 'Saídas', values: [1, 0, 2, 1, 1, 3, 0] },
        ]}
      />
    </div>
  );
}

/** Barras horizontais medidas contra o maior total; cinza é unidade encerrada. */
```

### EstabelecimentosPorUf

```jsx
() => {
  return (
    <div style={{ width: '22rem' }}>
      <BarList
        legend={[
          { label: 'Ativas' },
          { label: 'Inativas', inactive: true },
        ]}
        rows={[
          { label: 'SP', segments: [{ value: 14 }, { value: 3, inactive: true }] },
          { label: 'MG', segments: [{ value: 8 }, { value: 1, inactive: true }] },
          { label: 'PR', segments: [{ value: 5 }] },
          { label: 'RS', segments: [{ value: 4 }, { value: 2, inactive: true }] },
          { label: '+3', segments: [{ value: 4 }, { value: 2, inactive: true }] },
        ]}
        title="Estabelecimentos por UF"
      />
    </div>
  );
}
```
