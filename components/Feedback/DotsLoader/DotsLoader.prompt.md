DotsLoader from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.DotsLoader` (bundle loaded from the root `_ds_bundle.js`).

Os três pontos que pulsam enquanto o agente pensa ou o texto ainda está
chegando — o mesmo `.ai-loader` da conversa do app. O rótulo é só para o
leitor de tela; visualmente os pontos bastam.

## Props

```ts
interface DotsLoaderProps {
  label?: string;
}
```

## Examples

### Digitando

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <AiTurn from="assistant"><DotsLoader label="O agente está preparando a resposta" /></AiTurn>
    </div>
  );
}
```
