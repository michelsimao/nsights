PieChart from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.PieChart` (bundle loaded from the root `_ds_bundle.js`).

Donut estático para composição de um todo — consultas por família de fonte,
créditos por módulo. O app não tem gráfico de pizza; desenho novo (`ns-`)
com o vocabulário da casa: fatias nos tokens de série, separadas por um fio
de 1.5px na cor do painel, total no vão central em Geist Mono.

A legenda em palavras é obrigatória e vem do lado: cor nunca é o único
canal (regra do produto), então cada fatia aparece com rótulo, porcentagem
e valor. Sem interação — quem quer o número exato lê a legenda.

## Props

```ts
interface PieChartProps {
  data: PieSlice[];
  /** Formata os valores da legenda e do centro (padrão pt-BR). */
  formatValue?: (value: number) => string;
  title?: string;
  /** Palavra sob o total no vão do donut. */
  totalLabel?: string;
}
```

## Examples

### ConsultasPorFonte

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: '.55rem', padding: '1.1rem', width: '30rem' }}>
      <PieChart data={CONSULTAS} title="Consultas por família de fonte" totalLabel="consultas" />
    </div>
  );
}

/** Uma família só domina o período: a fatia cheia vira anel, sem quebrar. */
```

### FonteUnica

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: '.55rem', padding: '1.1rem', width: '26rem' }}>
      <PieChart data={[{ label: 'Cadastral', value: 812 }]} title="Consultas do plano mínimo" totalLabel="consultas" />
    </div>
  );
}
```
