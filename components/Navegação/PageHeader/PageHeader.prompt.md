PageHeader from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.PageHeader` (bundle loaded from the root `_ds_bundle.js`).

O topo de uma tela: rótulo, título grande e a ação da página.

O `Button` colocado em `action` herda o desenho de chip escuro com filete de
acento — é assim que a ação principal aparece em todas as telas da plataforma,
e por isso não se passa variante diferente aqui.

## Props

```ts
interface PageHeaderProps {
  action?: React.ReactNode;
  /** Uma ou duas linhas sobre o que a tela faz. */
  description: string;
  /** Rótulo curto em caixa alta acima do título. */
  kicker: string;
  title: string;
}
```

## Examples

### Topo

```jsx
() => {
  return (
    <div style={{ width: '44rem' }}>
      <PageHeader
        action={<Button icon={<PlusIcon />}>Nova análise</Button>}
        description="Toda análise de KYC iniciada nesta organização, com a política aplicada, a cobertura obtida e o veredito rastreável até a evidência."
        kicker="Operações de risco"
        title="Análises"
      />
    </div>
  );
}
```
