AiTurn from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiTurn` (bundle loaded from the root `_ds_bundle.js`).

Um turno da conversa: quem falou e o que disse.

O turno da pessoa recua à direita numa bolha neutra com borda — era escura
quase preta no app e virava um paredão quando empilhava; a versão leve
deixa a conversa alternar com respiro. O turno do agente ocupa a largura
toda, sem bolha: a resposta é o conteúdo principal, não um balão.

O agente ganha a marca (AiSpark `sm`) como avatar por padrão; a pessoa não
tem avatar, como no app. Passe `avatar={null}` para suprimir ou outro nó
para trocar. O avatar é decorativo (`aria-hidden`) — quem fala já está dito
pela ordem e pelo conteúdo.

## Props

```ts
interface AiTurnProps {
  /** Substitui o avatar padrão; `null` remove. Só o agente tem avatar por padrão. */
  avatar?: React.ReactNode;
  children: React.ReactNode;
  from: "assistant" | "user";
}
```

## Examples

### Turnos

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.6rem', width: '30rem' }}>
      <AiTurn from="user">Quais processos ativos a ACME Participações tem no polo passivo?</AiTurn>
      <AiTurn from="assistant">São 3 processos ativos, somando R$ 3,2 mi em discussão — dois no TJSP e um no TRF3. O de maior valor foi distribuído em 2022.</AiTurn>
    </div>
  );
}
```
