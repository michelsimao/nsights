SectionHeading from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.SectionHeading` (bundle loaded from the root `_ds_bundle.js`).

Cabeçalho de seção: rótulo em caixa alta, título e uma linha de apoio.

Abre um bloco dentro de uma página que já tem `PageHeader`. Se a seção é a
página inteira, use `PageHeader`; dois títulos grandes seguidos competem.

## Props

```ts
interface SectionHeadingProps {
  /** Linha de apoio sob o título. Uma frase. */
  description?: React.ReactNode;
  /** Rótulo curto em caixa alta, acima do título. */
  kicker?: React.ReactNode;
  title: React.ReactNode;
}
```

## Examples

### Bloco

```jsx
() => {
  return (
    <div style={{ width: '32rem' }}>
      <SectionHeading
        description="Cada fonte responde por uma parte do checklist. As que falharem aparecem como lacuna, não como ausência de apontamento."
        kicker="Passo 3 de 5"
        title="Fontes da consulta"
      />
    </div>
  );
}
```
