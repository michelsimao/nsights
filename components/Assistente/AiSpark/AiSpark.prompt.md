AiSpark from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiSpark` (bundle loaded from the root `_ds_bundle.js`).

A marca do Agente de Consultas — o balão de conversa com o ponto de status.

É o mesmo SVG do app, sempre: a marca identifica o agente em toda a
superfície (cabeçalho, avatar de turno, cartões), e um símbolo diferente em
cada lugar leria como agentes diferentes. `sm` é o tamanho de avatar dentro
de um turno; `md`, o de cabeçalho e apresentação.

Por padrão é decorativa (`aria-hidden`): no app ela sempre acompanha um
texto que diz quem fala. Passe `label` apenas quando a marca aparecer
sozinha e precisar carregar o sentido.

## Props

```ts
interface AiSparkProps {
  /** Nome acessível quando a marca aparece sem texto ao lado. */
  label?: string;
  size?: "md" | "sm";
}
```

## Examples

### Marca

```jsx
() => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: '1rem', width: '16rem' }}>
      <AiSpark />
      <AiSpark size="sm" />
      <AiSpark label="Agente de Consultas" />
    </div>
  );
};

/** A identidade que abre o painel de conversa: marca, nome e estado em palavras. */
```

### Identidade

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '1rem', width: '20rem' }}>
      <AiIdentity name="Agente de Consultas" state="pronto pra montar seu escopo" />
      <AiIdentity name="Agente de Consultas" state="respondendo…" />
      <AiIdentity name="Agente de Consultas" />
    </div>
  );
}
```
