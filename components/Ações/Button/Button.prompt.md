Button from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Button` (bundle loaded from the root `_ds_bundle.js`).

A ação. Uma `primary` por tela — a que a tela existe para fazer.

Duas heranças de contexto que valem saber, porque não são invenção deste
componente e sim como o app já se comporta:
`primary` dentro do slot de ação do `PageHeader` vira o chip escuro com o filete
de acento à esquerda; `ghost` só tem desenho dentro do `WizardFooter` (é a
variante translúcida sobre o rodapé escuro) e fora dele sai sem estilo.

## Props

```ts
interface ButtonProps {
children: React.ReactNode;
  /** SVG de 16px à esquerda do rótulo. Leva className="button-icon". Ignorado enquanto `loading`. */
  icon?: React.ReactNode;
  /** Troca o ícone por um spinner e desabilita o botão. */
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
  style?: React.CSSProperties;
}
```

## Examples

### Variantes

```jsx
() => {
  return (
    <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
      <Button>Iniciar análise</Button>
      <Button variant="secondary">Cancelar</Button>
    </div>
  );
}

/** Com ícone, e o estado de espera — que desabilita o botão sozinho. */
```

### Estados

```jsx
() => {
  return (
    <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
      <Button icon={<PlusIcon />}>Nova análise</Button>
      <Button loading>Consultando fontes</Button>
      <Button disabled variant="secondary">Sem créditos</Button>
    </div>
  );
}
```
