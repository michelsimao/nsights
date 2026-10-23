Skeleton from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Skeleton` (bundle loaded from the root `_ds_bundle.js`).

O bloco que pulsa enquanto o dado não chegou.

Use com a forma do que vai aparecer: `panel` reserva a altura de um painel,
`card` a de um cartão. Um esqueleto menor que o conteúdo real faz a página
pular quando os dados chegam — é o defeito que ele existe para evitar.
É um `div`, como no app — as classes de tamanho não se aplicam a inline.

## Props

```ts
interface SkeletonProps {
  /** Altura em CSS, quando nenhuma forma serve. */
  height?: string;
  shape?: "line" | "wide" | "card" | "panel";
  /** Largura em CSS. */
  width?: string;
}
```

## Examples

### Formas

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.75rem', width: '30rem' }}>
      <Skeleton shape="wide" />
      <Skeleton height=".75rem" width="9rem" />
      <div style={{ display: 'grid', gap: '.6rem', gridTemplateColumns: '1fr 1fr' }}>
        <Skeleton shape="card" />
        <Skeleton shape="card" />
      </div>
    </div>
  );
}
```
