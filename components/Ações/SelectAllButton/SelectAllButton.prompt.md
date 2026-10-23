SelectAllButton from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.SelectAllButton` (bundle loaded from the root `_ds_bundle.js`).

O link "Selecionar todas / Desmarcar todas" que acompanha uma lista de
checkboxes — o mesmo botão-link do resumo de coberturas do assistente.

Os rótulos são fixos de propósito: o par é um vocabulário do produto, não
texto livre. Só alterna o verbo conforme o estado corrente da lista.

## Props

```ts
interface SelectAllButtonProps {
  /** `true` quando todas as opções (não obrigatórias) já estão marcadas. */
  allSelected: boolean;
  onToggle?: () => void;
}
```

## Examples

### Estados

```jsx
() => {
  return (
    <div style={{ display: 'flex', gap: '.6rem' }}>
      <SelectAllButton allSelected={false} onToggle={() => {}} />
      <SelectAllButton allSelected onToggle={() => {}} />
    </div>
  );
}
```
