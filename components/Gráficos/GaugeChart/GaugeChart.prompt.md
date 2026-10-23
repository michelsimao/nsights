GaugeChart from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.GaugeChart` (bundle loaded from the root `_ds_bundle.js`).

Meia-lua estática para um valor contra um teto — cobertura de fontes,
consumo de créditos. O app não tem gauge; desenho novo (`ns-`): trilho em
`--border`, faixa preenchida no tom semântico e valor central em Geist Mono.

O tom é escolha de quem chama, não do componente: 87% de cobertura é
`success`, 87% de crédito consumido é `warning` — o mesmo número, leituras
opostas. E como cor sozinha não informa (regra do produto), o `label` em
palavra sob o valor é obrigatório.

## Props

```ts
interface GaugeChartProps {
  /** A palavra sob o valor: o que o número mede ("cobertura", "consumido"). */
  label: string;
  max?: number;
  tone?: "warning" | "success" | "danger" | "accent";
  value: number;
  /** Sobrescreve o texto central; o padrão é a porcentagem inteira. */
  valueText?: string;
}
```

## Examples

### CoberturaECreditos

```jsx
() => {
  return (
    <div style={{ display: 'flex', gap: '1rem', width: '30rem' }}>
      <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: '.55rem', flex: 1, padding: '1rem' }}>
        <GaugeChart label="cobertura de fontes" tone="success" value={87} />
      </div>
      <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: '.55rem', flex: 1, padding: '1rem' }}>
        <GaugeChart label="créditos consumidos" tone="warning" value={92} />
      </div>
    </div>
  );
}

/** Valor absoluto contra teto, com texto central próprio. */
```

### FilaDeAnalises

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: '.55rem', padding: '1rem', width: '14.5rem' }}>
      <GaugeChart label="da capacidade diária" max={40} tone="danger" value={37} valueText="37 de 40" />
    </div>
  );
}
```
