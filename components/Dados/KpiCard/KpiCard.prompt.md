KpiCard from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.KpiCard` (bundle loaded from the root `_ds_bundle.js`).

Um `MetricTile` com movimento: além de rótulo, valor e contexto, carrega o
delta do período e uma sparkline. Emite o MESMO `.overview-metric` do app
(vai dentro de `MetricGrid`, lado a lado com `MetricTile`); só o delta e a
sparkline são camada nova (`ns-`).

O delta segue a regra da casa de que cor sozinha não informa: sinal no
número, cor semântica E a palavra junto — "+18% em alta", "-3 em queda".
São dois canais independentes: o sinal segue a aritmética; a cor segue se a
mudança é boa — `invert` para métricas em que subir é ruim (lacunas, vetos,
inadimplência). Zero é "estável", nunca alta.

A sparkline é traço fino no acento, decorativa por definição: a leitura
oficial é o valor e o delta; ela só dá a forma da curva. Delta em `<p>`, não
`<span>`, porque `.overview-metric > span` é o seletor do rótulo.

## Props

```ts
interface KpiCardProps {
  /** O delta do período com sinal, ex.: "+18%", "-3". */
  delta?: string;
  /** A linha pequena de contexto: comparação, período, ressalva. */
  hint?: React.ReactNode;
  /** Métrica em que subir é ruim: inverte a cor do delta, não o sinal. */
  invert?: boolean;
  label: React.ReactNode;
  /** Série curta para a sparkline, do mais antigo ao mais recente. */
  spark?: number[];
  tone?: "warning" | "danger" | "neutral" | "accent";
  value: React.ReactNode;
}
```

## Examples

### FaixaExecutiva

```jsx
() => {
  return (
    <div style={{ width: '46rem' }}>
      <MetricGrid>
        <KpiCard
          delta="+18%"
          hint="Período anterior: 1.089"
          label="Análises iniciadas"
          spark={[64, 71, 68, 80, 92, 88, 104]}
          tone="accent"
          value="1.284"
        />
        <KpiCard
          delta="+2%"
          hint="1.207 concluídas no período"
          label="Taxa de conclusão"
          spark={[89, 91, 90, 92, 93, 94, 94]}
          value="94%"
        />
        <KpiCard
          delta="+12%"
          hint="Fonte indisponível na coleta"
          invert
          label="Com lacunas"
          spark={[4, 6, 5, 8, 9, 11, 12]}
          tone="warning"
          value="96"
        />
        <KpiCard
          delta="-3"
          hint="Eram 10 no período anterior"
          invert
          label="Vetos emitidos"
          spark={[12, 10, 11, 9, 10, 8, 7]}
          tone="danger"
          value="7"
        />
      </MetricGrid>
    </div>
  );
}

/** Zero é estável, nunca alta: sem cor de movimento, palavra neutra. */
```

### SemMovimento

```jsx
() => {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '.55rem', overflow: 'hidden', width: '14rem' }}>
      <KpiCard delta="+0%" hint="Mesmo patamar do período anterior" label="Reprocessamentos" spark={[40, 42, 41, 41, 40, 41, 41]} value="41" />
    </div>
  );
}
```
