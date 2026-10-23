WorkspaceBack from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.WorkspaceBack` (bundle loaded from the root `_ds_bundle.js`).

Botão de voltar do workspace dedicado — a seta que devolve a pessoa à
conversa quando o resultado abriu em tela própria. É o `icon-btn` do app com
o gancho `workspace-back` (`flex: 0 0 auto`) para não encolher no cabeçalho.

O rótulo deve dizer PARA ONDE volta ("Voltar para a conversa"), porque a
seta sozinha não diz.

## Props

```ts
interface WorkspaceBackProps {
  label?: string;
  onBack?: () => void;
}
```

## Examples

### Volta

```jsx
() => {
  return <WorkspaceBack label="Voltar para o histórico" onBack={() => {}} />;
}
```
