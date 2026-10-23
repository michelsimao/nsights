AiVote from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiVote` (bundle loaded from the root `_ds_bundle.js`).

O feedback sobre uma resposta da IA: ajudou / não ajudou, com regenerar e
copiar opcionais. Sem botão primário de propósito — feedback é convite,
não etapa do fluxo.

O voto é REVERSÍVEL: clicar no voto ativo devolve `null` (o analista mudou
de ideia, o produto não prende opinião). O estado vem por `aria-pressed`
e é controlado pela prop `value`. Ícones de traço com `aria-label` e
`title` por palavra — nunca emoji, que está fora do sistema.

## Props

```ts
interface AiVoteProps {
  label?: string;
  /** Copiar a resposta. Sem ele o botão de texto não aparece. */
  onCopy?: () => void;
  /** Gerar a resposta de novo. Sem ele o botão não aparece. */
  onRegenerate?: () => void;
  onVote?: (value: AiVoteValue | null) => void;
  value?: "up" | "down";
}
```

## Examples

### SemVoto

```jsx
() => {
  return (
    <div style={{ width: '20rem' }}>
      <AiVote onCopy={() => undefined} onRegenerate={() => undefined} onVote={() => undefined} />
    </div>
  );
}

/** Voto dado (aria-pressed): clicar de novo no mesmo botão desfaz. */
```

### VotoDado

```jsx
() => {
  return (
    <div style={{ width: '20rem' }}>
      <AiVote onCopy={() => undefined} onVote={() => undefined} value="up" />
    </div>
  );
}
```
