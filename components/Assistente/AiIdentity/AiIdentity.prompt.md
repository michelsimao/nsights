AiIdentity from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiIdentity` (bundle loaded from the root `_ds_bundle.js`).

A identidade completa do agente: marca, nome e estado corrente.

É o bloco que abre o painel de conversa no app ("Agente de Consultas ·
pronto"). O estado é dito em palavras — "pronto", "respondendo…" — porque o
ponto verde sozinho não diz nada a quem não enxerga cor; o ponto (`.live`)
fica `aria-hidden` e o texto é a informação.

## Props

```ts
interface AiIdentityProps {
  /** Nome do agente, ex.: "Agente de Consultas". */
  name: string;
  /** Estado em palavras: "pronto", "respondendo…". Sem ele, só a marca e o nome. */
  state?: React.ReactNode;
}
```

## Examples

### Identidade

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.7rem', width: '20rem' }}>
      <AiIdentity name="Agente de Consultas" state="pronto" />
      <AiIdentity name="Agente de Consultas" state="respondendo…" />
    </div>
  );
}
```
