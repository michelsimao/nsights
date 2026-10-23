Sparkline from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Sparkline` (bundle loaded from the root `_ds_bundle.js`).

A pílula de tendência do perfil: mini-linha, número e um fundo que já dá o
veredito (verde subiu, vinho caiu).

Com dois pontos ou mais, o traço desenha a série real normalizada na janela
do ícone do app (x 4–20, y 8–16) e enfatiza o ponto final com um disco cheio
— a pergunta que a pílula responde é "onde terminou". Com menos que isso não
há linha a desenhar e entra a seta fixa do app. O componente NÃO formata o
número: sinal, casa decimal e sufixo são decisão de quem conhece a métrica
("+12,4%", "−38 vínculos").

## Props

```ts
interface SparklineProps {
  /** O número exibido, já formatado ("+12,4%"). */
  text: string;
  /** Força o tom quando subir não é bom (processos novos, desligamentos). Sem ele, último ponto >= primeiro pinta de alta. */
  tone?: "up" | "down";
  /** A série do período, em ordem cronológica. */
  values: number[];
}
```

## Examples

### Tendencias

```jsx
() => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: '.6rem', width: '26rem' }}>
      <Sparkline text="+12,4%" values={[182, 185, 181, 190, 204, 228]} />
      <Sparkline text="-8,2%" values={[46, 44, 45, 41, 39, 38]} />
      <Sparkline text="+5 processos" tone="down" values={[2, 2, 3, 4, 6, 7]} />
    </div>
  );
}

/** Sem série suficiente para traçar, entra a seta fixa do app. */
```

### SemSerie

```jsx
() => {
  return (
    <div style={{ display: 'flex', gap: '.6rem', width: '18rem' }}>
      <Sparkline text="+3,1%" values={[204]} />
      <Sparkline text="-1,7%" tone="down" values={[]} />
    </div>
  );
}
```
