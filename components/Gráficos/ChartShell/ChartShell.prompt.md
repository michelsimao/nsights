ChartShell from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ChartShell` (bundle loaded from the root `_ds_bundle.js`).

O cartão que emoldura qualquer gráfico do resultado: título em caixa alta,
recorte à direita e, quando o desenho precisa de instrução, uma nota ANTES
dele — quem lê primeiro a régua não precisa adivinhar o que as marcas dizem.

`meta` é para contagem ou recorte ("142 processos · 3 entidades"), em números
tabulares por CSS; estado ("coletando", "falhou") pertence a `StatusPill`,
não ao cabeçalho do gráfico.

## Props

```ts
interface ChartShellProps {
  children: React.ReactNode;
  /** Contagem ou recorte à direita do título, nunca estado. */
  meta?: React.ReactNode;
  /** Como ler o gráfico — aparece antes do desenho. */
  note?: React.ReactNode;
  title: React.ReactNode;
  /** Ocupa a linha inteira da grade de gráficos (classe `timeline-card`). */
  wide?: boolean;
}
```

## Examples

### TendenciaDeAnalises

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <ChartShell meta="últimos 30 dias" title="Volume de análises por dia">
        <ChartLegend items={['Iniciadas', 'Concluídas']} />
        <ChartPlot axis={['01 ago', '08 ago', '15 ago', '22 ago', '28 ago']}>
          <svg aria-label="Análises iniciadas e concluídas por dia, pico de 24 iniciadas em 22 de agosto" preserveAspectRatio="none" role="img" viewBox="0 0 720 184">
            <defs>
              <linearGradient id="advisory-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--accent)" stopOpacity=".16" />
                <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="advisory-chart-area" d="M 0 126 L 102.9 107 L 205.7 75.3 L 308.6 94.3 L 411.4 50 L 514.3 12 L 617.1 56.3 L 720 31 L 720 164 L 0 164 Z" />
            <path className="advisory-chart-started" d="M 0 126 L 102.9 107 L 205.7 75.3 L 308.6 94.3 L 411.4 50 L 514.3 12 L 617.1 56.3 L 720 31" />
            <path className="advisory-chart-completed" d="M 0 138.7 L 102.9 119.7 L 205.7 100.7 L 308.6 107 L 411.4 81.7 L 514.3 43.7 L 617.1 69 L 720 50" />
          </svg>
        </ChartPlot>
      </ChartShell>
    </div>
  );
}

/** Cartão com nota de leitura antes do desenho, emoldurando outro gráfico da casa. */
```

### ComNotaDeLeitura

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <ChartShell
        meta="38 processos"
        note="Colunas por ano de distribuição · processos sem data ficam fora do gráfico."
        title="Linha do tempo — ano de distribuição"
      >
        <BarChart
          categories={['2020', '2021', '2022', '2023', '2024', '2025']}
          label="Processos distribuídos por ano, de 3 em 2020 a 5 em 2025"
          series={[
            { label: 'Cíveis', values: [2, 4, 3, 7, 6, 3] },
            { label: 'Trabalhistas', values: [1, 2, 1, 4, 3, 2] },
          ]}
        />
      </ChartShell>
    </div>
  );
}
```
