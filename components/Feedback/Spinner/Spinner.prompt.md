Spinner from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Spinner` (bundle loaded from the root `_ds_bundle.js`).

O anel que gira enquanto uma ação curta não termina.

Para conteúdo que tem forma conhecida, prefira `Skeleton` — o spinner é para
espera de ação, não de página. O anel é o `.detail-spinner` do app (a
animação já respeita `prefers-reduced-motion` lá); sem rótulo visível, o
`aria-label` "Carregando" garante que o `role="status"` anuncie algo.

## Props

```ts
interface SpinnerProps {
  /** Texto visível ao lado do anel ("Consultando Receita Federal…"). */
  label?: string;
}
```

## Examples

### Aguardando

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.9rem', width: '22rem' }}>
      <Spinner label="Consultando Receita Federal…" />
      <Spinner label="Coletando… 3 de 8 fontes concluídas." />
      <Spinner />
    </div>
  );
}

/** Os pulsos da conversa: o agente pensando e a sessão conectada. */
```

### Pulsos

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.9rem', width: '22rem' }}>
      <DotsLoader label="Agente redigindo o resumo…" />
      <span style={{ alignItems: 'center', color: 'var(--muted)', display: 'inline-flex', fontSize: '.68rem', gap: '.3rem' }}>
        <LiveDot /> Agente de Consultas conectado
      </span>
    </div>
  );
}
```
