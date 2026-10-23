ProgressBar from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ProgressBar` (bundle loaded from the root `_ds_bundle.js`).

O progresso determinado de uma rodada: contador-herói, barra segmentada e
legenda. É o genérico para trabalho em lote (consultas de uma rodada,
arquivos de um envio); o `Meter` é o específico da análise, com a trava de
99% e o estágio na legenda.

A barra é decorativa (`aria-hidden`): o contador e a legenda dizem os mesmos
números por extenso, então o progresso nunca é só cor nem só comprimento.
Na legenda, só segmentos com contagem > 0 aparecem — "0 executando" além de
ruído colide com o passo "Executando" de uma linha do tempo ao lado. A fila
não tem segmento na barra: fila é o trilho que ainda não foi preenchido.

## Props

```ts
interface ProgressBarProps {
  /** Itens concluídos. */
  done: number;
  /** Itens que falharam. */
  failed?: number;
  /** Itens em execução agora. */
  running?: number;
  /** Total planejado da rodada. */
  total: number;
  /** Palavra do contador e da legenda ("concluídas", "enviados"). */
  unit?: string;
}
```

## Examples

### EmExecucao

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <ProgressBar done={9} running={3} total={16} unit="concluídas" />
    </div>
  );
}

/** Rodada encerrada com falhas: o vermelho fica na barra e na legenda, com número. */
```

### ComFalhas

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <ProgressBar done={14} failed={2} total={16} unit="concluídas" />
    </div>
  );
}

/** Fora das consultas: o mesmo medidor conta documentos de um envio em lote. */
```

### EnvioDeArquivos

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <ProgressBar done={41} running={1} total={120} unit="enviados" />
    </div>
  );
}
```
