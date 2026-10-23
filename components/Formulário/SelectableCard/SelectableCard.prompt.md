SelectableCard from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.SelectableCard` (bundle loaded from the root `_ds_bundle.js`).

O cartão de escolha única do assistente — escopo da análise, modelo de risco.

É um botão inteiro, não um cartão com rádio dentro: a área de clique é o
cartão, e o estado vai em `aria-pressed`, como no app — o rádio à direita é
só a marca visual. `intensity` desenha as três barrinhas que dizem o quanto
aquele escopo custa em consultas.

## Props

```ts
interface SelectableCardProps {
  description?: React.ReactNode;
  /** Ícone à esquerda do cabeçalho. Alternativa a `intensity`. */
  glyph?: React.ReactNode;
  /** Ressalva em texto miúdo, sob a descrição. */
  hint?: React.ReactNode;
  /** 1 a 3 — quantas barrinhas acendem. */
  intensity?: 1 | 2 | 3;
  onSelect?: () => void;
  selected?: boolean;
  title: React.ReactNode;
}
```

## Examples

### Escopo

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.6rem', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', width: '46rem' }}>
      <SelectableCard
        description="Só a entidade consultada, sem cadeia societária."
        intensity={1}
        title="Entidade"
      />
      <SelectableCard
        description="A entidade e seus sócios diretos."
        intensity={2}
        selected
        title="Entidade e sócios"
      />
      <SelectableCard
        description="A entidade, os sócios e as empresas do grupo."
        hint="Inclui empresas nas quais os sócios diretos possuem participação"
        intensity={3}
        title="Grupo econômico"
      />
    </div>
  );
}
```
