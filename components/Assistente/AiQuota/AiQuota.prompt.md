AiQuota from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiQuota` (bundle loaded from the root `_ds_bundle.js`).

O consumo de créditos do plano: um número gigante em mono roxo — o saldo — e,
abaixo, as linhas de detalhe (consumido no mês, reservado em rodadas...).

O saldo é a única coisa que a pessoa procura nesse cartão, e por isso ele é o
hero em 3rem: quem está prestes a aprovar uma rodada precisa saber de relance
se cabe no que tem. A `note` fica colada no número para a renovação e o
excedente serem lidos juntos com o saldo, nunca depois dele.

## Props

```ts
interface AiQuotaProps {
  /** Saldo atual, em créditos. Vira o número grande do hero. */
  available: number;
  /** Rótulo curto acima do número. */
  label?: string;
  /** Renovação e preço do excedente, em uma linha, sob o número. */
  note?: React.ReactNode;
  /** Rótulo em caixa alta do cabeçalho do cartão. */
  eyebrow?: string;
  /** Título do cabeçalho do cartão ("Plano Operacional"). */
  title?: string;
  /** Linhas de detalhe abaixo do hero. */
  items?: AiQuotaItem[];
}
```

## Examples

### SaldoDoPlano

```jsx
() => {
  return (
    <div style={{ width: '22rem' }}>
      <AiQuota
        available={12500}
        eyebrow="Plano Operacional"
        items={[
          { label: 'Consumido no mês', value: 7488 },
          { label: 'Reservado em rodadas', value: 640 },
          { label: 'Limite mensal', value: 20000 },
        ]}
        note="Renova em 01/09 · excedente a R$ 0,42 por crédito"
        title="Créditos"
      />
    </div>
  );
}

/** O extrato de uma rodada no workspace: reserva, consumo e o que voltou. */
```

### ExtratoDaRodada

```jsx
() => {
  return (
    <div style={{ width: '22rem' }}>
      <AiQuotaBreakdown
        items={[
          { label: 'Estimado', value: 96 },
          { label: 'Reservado', value: 96 },
          { label: 'Consumido', value: 88 },
          { label: 'Liberado', value: 8 },
        ]}
      />
    </div>
  );
}
```

## Related

`AiQuotaBreakdown`
