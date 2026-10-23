Eyebrow from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Eyebrow` (bundle loaded from the root `_ds_bundle.js`).

O rótulo em caixa alta que abre uma seção, na cor de acento.

É o portador textual da hierarquia: quando um estado depende de cor (a borda do
veredito, a faixa de um KPI), o eyebrow é quem diz em palavras o que a cor diz.
Uma linha curta — três a cinco palavras. Não é subtítulo.

## Props

```ts
interface EyebrowProps {
  children: React.ReactNode;
}
```

## Examples

### Rotulo

```jsx
() => {
  return (
    <div style={{ width: '24rem' }}>
      <Eyebrow>Veredito da análise · Risco alto</Eyebrow>
      <h2 style={{ fontSize: '1rem', fontWeight: 650, letterSpacing: '-.02em', margin: '.25rem 0 0' }}>
        Três apontamentos graves e uma lacuna de cobertura.
      </h2>
    </div>
  );
}
```
