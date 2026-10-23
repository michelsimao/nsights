WizardFooter from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.WizardFooter` (bundle loaded from the root `_ds_bundle.js`).

O rodapé escuro fixo do assistente: à esquerda o que a decisão custa, à
direita voltar e avançar.

O custo fica sempre visível — é o que impede alguém disparar uma análise de
centenas de consultas sem ver o preço. Use `Button` com `variant="ghost"` em
`back`: a variante translúcida só tem desenho aqui dentro.

## Props

```ts
interface WizardFooterProps {
  /** Ação secundária, à esquerda das principais. */
  back?: React.ReactNode;
  /** Rótulo em caixa alta e o valor: créditos, consultas previstas. */
  meta?: React.ReactNode;
  next?: React.ReactNode;
}
```

## Examples

### Rodape

```jsx
() => {
  return (
    <div style={{ width: '38rem' }}>
      <WizardFooter
        back={<Button variant="ghost">Voltar</Button>}
        meta={<><span>Custo estimado</span><strong>812 consultas · 1.240 créditos</strong></>}
        next={<Button>Iniciar análise</Button>}
      />
    </div>
  );
}

/** Sem crédito suficiente: avançar fica desabilitado, com o motivo à esquerda. */
```

### SemCredito

```jsx
() => {
  return (
    <div style={{ width: '38rem' }}>
      <WizardFooter
        back={<Button variant="ghost">Voltar</Button>}
        meta={<><span>Créditos insuficientes</span><strong>faltam 320 créditos</strong></>}
        next={<Button disabled>Iniciar análise</Button>}
      />
    </div>
  );
}
```
