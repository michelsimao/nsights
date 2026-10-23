CheckCard from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.CheckCard` (bundle loaded from the root `_ds_bundle.js`).

A linha-cartão de uma verificação: categoria em caixa alta, nome e uma linha
de descrição cortada em uma linha só.

O corte é proposital — a descrição completa está no detalhe, e uma lista de
40 verificações com três linhas cada deixa de ser navegável.

## Props

```ts
interface CheckCardProps {
  category?: React.ReactNode;
  description?: React.ReactNode;
  onClick?: () => void;
  /** Badge ou ação à direita. */
  side?: React.ReactNode;
  title: React.ReactNode;
}
```

## Examples

### Lista

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.5rem', width: '30rem' }}>
      <CheckCard
        category="Societário"
        description="Confere se o quadro de sócios da base cadastral fecha com o do contrato social."
        side={<Badge tone="ok">Verificado</Badge>}
        title="Quadro societário consistente"
      />
      <CheckCard
        category="Judicial"
        description="Processos em que a entidade figura no polo passivo nos últimos cinco anos."
        side={<Badge tone="attention">3 em andamento</Badge>}
        title="Litígios relevantes"
      />
      <CheckCard
        category="Reputacional"
        description="Menções em mídia com juízo negativo, avaliadas por gravidade e recorrência."
        side={<Badge tone="gap">Fonte indisponível</Badge>}
        title="Mídia adversa"
      />
    </div>
  );
}
```
