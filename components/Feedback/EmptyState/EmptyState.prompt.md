EmptyState from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.EmptyState` (bundle loaded from the root `_ds_bundle.js`).

O vazio de um painel: marca, título e uma frase que diz o que fazer.

Vazio não é erro. O texto explica por que não há nada aqui — filtro sem
resultado, análise ainda não rodada — e nunca deixa o usuário achando que
algo quebrou.

## Props

```ts
interface EmptyStateProps {
  description: string;
  title: string;
}
```

## Examples

### SemResultado

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <DataPanel title="Análises recentes">
        <EmptyState
          description="Nenhuma análise no período selecionado. Amplie o intervalo ou inicie uma nova análise."
          title="Sem análises nas últimas 24 horas"
        />
      </DataPanel>
    </div>
  );
}
```
