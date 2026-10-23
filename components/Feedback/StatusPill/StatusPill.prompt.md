StatusPill from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.StatusPill` (bundle loaded from the root `_ds_bundle.js`).

Pílula compacta de situação para linhas de tabela e listas — menor e mais
discreta que `Badge`, porque numa tabela de 40 linhas o estado não pode gritar.

`ativa`/`alerta`/`inativa` descrevem a entidade; `done`/`failed`/`cancelled`,
a análise — são os estados que o app pinta de verdade. Sem `status`, a pílula
sai neutra (o app faz isso quando o estado ainda não tem tom).

## Props

```ts
interface StatusPillProps {
  children: React.ReactNode;
  status?: "done" | "failed" | "ativa" | "alerta" | "inativa" | "cancelled";
}
```

## Examples

### Situacoes

```jsx
() => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', alignItems: 'center' }}>
      <StatusPill status="ativa">Ativa</StatusPill>
      <StatusPill status="alerta">Alerta</StatusPill>
      <StatusPill status="inativa">Inativa</StatusPill>
      <StatusPill status="done">Concluída</StatusPill>
      <StatusPill status="failed">Falhou</StatusPill>
      <StatusPill status="cancelled">Cancelada</StatusPill>
      <StatusPill>Em processamento</StatusPill>
    </div>
  );
}
```
