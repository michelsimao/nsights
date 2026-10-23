Fact from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Fact` (bundle loaded from the root `_ds_bundle.js`).

Um fato do dossiê: rótulo, valor e ressalva, em cartão branco.

`sign` colore só o valor — `negative` para o que pesa contra (processo ativo,
dívida), `positive` para o que conta a favor. Fato neutro não recebe cor
nenhuma; colorir tudo é o mesmo que não colorir nada.

## Props

```ts
interface FactProps {
  hint?: React.ReactNode;
  label: React.ReactNode;
  sign?: "positive" | "negative";
  value: React.ReactNode;
}
```

## Examples

### Sinais

```jsx
() => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '.5rem', overflow: 'hidden', width: '34rem' }}>
      <Fact hint="Receita Federal · há 2 dias" label="Situação cadastral" value="Ativa" />
      <Fact hint="R$ 1,2 mi em discussão" label="Processos ativos" sign="negative" value="3" />
      <Fact hint="sem apontamento" label="Certidões negativas" sign="positive" value="4 de 4" />
    </div>
  );
}
```
