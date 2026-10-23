AiQuotaBreakdown from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiQuotaBreakdown` (bundle loaded from the root `_ds_bundle.js`).

O extrato compacto de créditos de UMA rodada de consulta, no workspace:
estimado, reservado, consumido e liberado lado a lado.

As quatro colunas existem porque a cobrança acontece em dois tempos — reserva
na aprovação, consumo na execução — e a diferença entre elas é o que volta
como "liberado". Mostrar só o consumido esconderia o crédito preso em rodadas
em andamento.

## Props

```ts
interface AiQuotaBreakdownProps {
  /** Na ordem do app: Estimado, Reservado, Consumido, Liberado. */
  items: AiQuotaItem[];
}
```

## Examples

### Extrato

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <AiQuotaBreakdown
        items={[
          { label: 'Estimado', value: 8 },
          { label: 'Reservado', value: 8 },
          { label: 'Consumido', value: 6 },
          { label: 'Liberado', value: 2 },
        ]}
      />
    </div>
  );
}
```
