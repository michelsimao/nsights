ResultRows from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ResultRows` (bundle loaded from the root `_ds_bundle.js`).

Agrupa `ResultRow`. Usa `role="group"`, não `list`: os filhos são linhas com
botão e badge, não `listitem`.

## Props

```ts
interface ResultRowsProps {
  children: React.ReactNode;
  label?: string;
}
```

## Examples

### Grupo

```jsx
() => {
  return (
    <div style={{ width: '30rem' }}>
      <ResultRows label="Certidões">
        <ResultRow badge={<Badge tone="ok">Negativa</Badge>} facts={['Receita Federal', 'válida até 12/11']} icon={<CheckIcon />} title="Débitos federais" />
        <ResultRow badge={<Badge tone="ok">Negativa</Badge>} facts={['TST', 'válida até 03/12']} icon={<CheckIcon />} title="Débitos trabalhistas" />
        <ResultRow badge={<Badge tone="attention">Positiva com efeito de negativa</Badge>} facts={['PGE-SP']} icon={<CheckIcon />} title="Dívida ativa estadual" />
      </ResultRows>
    </div>
  );
}
```
