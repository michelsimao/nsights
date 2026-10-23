AiConfidence from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiConfidence` (bundle loaded from the root `_ds_bundle.js`).

O vocabulário de incerteza de uma resposta da IA: a palavra + um medidor
de três pips. A CONTAGEM de pips preenchidos carrega o nível (3/2/1/0),
então ele sobrevive a daltonismo e a escala de cinza; a cor só reforça.

Regra de produto: inconclusivo é roxo-neutro (o cinza-arroxeado do
sistema), NUNCA verde — "não sei" não pode parecer aprovação num produto
de risco. O medidor é decorativo (`aria-hidden`); a palavra é o dado.

## Props

```ts
interface AiConfidenceProps {
  level: "alta" | "provavel" | "extrapolado" | "desconhecido";
  /** Por que esse nível — ex.: "direto do acórdão" ou "sem fonte primária". */
  note?: React.ReactNode;
}
```

## Examples

### NiveisDeConfianca

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.6rem', width: '24rem' }}>
      <AiConfidence level="alta" note="direto da certidão emitida em 26/08/2026" />
      <AiConfidence level="provavel" note="inferido do QSA e do histórico societário" />
      <AiConfidence level="extrapolado" note="além do que as fontes consultadas dizem" />
      <AiConfidence level="desconhecido" note="sem fonte primária para afirmar" />
    </div>
  );
}

/** O trecho incerto marcado onde acontece, com a ressalva no title. */
```

### RessalvaNaFrase

```jsx
() => {
  return (
    <div style={{ fontSize: '.78rem', lineHeight: 1.6, width: '26rem' }}>
      <p style={{ margin: 0 }}>
        O sócio administrador segue no quadro desde 2019 e{' '}
        <AiHedge title="Extrapolado: a última movimentação disponível é de março de 2025.">
          provavelmente mantém poderes de representação
        </AiHedge>
        , conforme a última alteração contratual arquivada na Junta Comercial.
      </p>
    </div>
  );
}
```
