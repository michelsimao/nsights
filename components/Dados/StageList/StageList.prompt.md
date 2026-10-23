StageList from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.StageList` (bundle loaded from the root `_ds_bundle.js`).

Narra uma chamada longa como os estágios que ela de fato roda.

O último estágio nunca se completa sozinho: não há canal de progresso — cada
uma dessas etapas é um único POST — e o painel jamais pode afirmar que o
trabalho acabou enquanto a resposta está em voo. Quando passar do previsto,
troque `lead` por uma nota honesta de demora em vez de fingir avanço.

## Props

```ts
interface StageListProps {
/** Índice do estágio em curso. Os anteriores aparecem concluídos. */
  activeIndex: number;
  /** Segundos decorridos, à direita do título. */
  elapsed?: number;
  /** Uma ou duas frases sobre a espera. */
  lead?: React.ReactNode;
  stages: { hint: string; key: string; label: string }[];
  title: string;
}
```

## Examples

### EmAndamento

```jsx
() => {
  return (
    <div style={{ width: '30rem' }}>
      <StageList
        activeIndex={2}
        elapsed={38}
        lead="Normalmente leva cerca de 60s."

        stages={STAGES}
        title="Analisando"
      />
    </div>
  );
}

/** Passou do previsto: a barra trava em 96% e o texto diz a verdade. */
```

### Demorando

```jsx
() => {
  return (
    <div style={{ width: '30rem' }}>
      <StageList
        activeIndex={3}
        elapsed={124}
        lead="Está demorando mais que o previsto — cadeias societárias grandes fazem muitas consultas encadeadas."

        stages={STAGES}
        title="Analisando"
      />
    </div>
  );
}
```
