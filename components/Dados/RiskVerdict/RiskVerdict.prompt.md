RiskVerdict from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.RiskVerdict` (bundle loaded from the root `_ds_bundle.js`).

A faixa de veredito no topo de um resultado: filete grosso à esquerda na cor
do desfecho, rótulo, conclusão e o que sustenta.

O `Eyebrow` textual não é decoração: sem ele a borda de 4px vira o único sinal
do veredito, e estado não pode depender só de cor. `unknown` é inconclusivo —
cinza, e nunca deve ser lido como "não incide". A marcação espelha o app:
rótulo, conclusão e parágrafos vivem juntos dentro de `.risk-verdict-head`.

## Props

```ts
interface RiskVerdictProps {
  /** Bloco à direita: `Facts`, escala, contagens. */
  aside?: React.ReactNode;
  /** O que sustenta a conclusão — parágrafos, uma ou duas frases. */
  children?: React.ReactNode;
  /** O veredito em palavras, ao lado de "Veredito da análise". */
  label: string;
  /** Carimbo em caixa alta à direita do rótulo — "VETO". */
  stamp?: React.ReactNode;
  /** A conclusão, em uma frase. */
  title: React.ReactNode;
  tone?: "veto" | "high" | "unknown" | "run";
}
```

## Examples

### Veto

```jsx
() => {
  return (
    <div style={{ width: '44rem' }}>
      <RiskVerdict
        aside={<RiskScale items={[{ swatch: 'veto', label: 'Veto' }, { swatch: 'grave', label: 'Grave' }, { swatch: 'clear', label: 'Não incide' }]} title="Grade" />}
        label="Veto"
        stamp="Veto"
        title="Sócio administrador consta em lista restritiva internacional."
        tone="veto"
      >
        <p style={{ color: 'var(--muted)', fontSize: '.75rem', lineHeight: 1.55, margin: '.5rem 0 0' }}>
          Correspondência por nome e data de nascimento na OFAC SDN. A regra de veto incide independentemente do valor da operação, e a confirmação documental fica com o analista.
        </p>
      </RiskVerdict>
    </div>
  );
}

/** Inconclusivo: cinza, e nunca deve ser lido como "não incide". */
```

### Inconclusivo

```jsx
() => {
  return (
    <div style={{ width: '44rem' }}>
      <RiskVerdict
        label="Inconclusivo"
        title="Duas fontes do escopo não responderam — a cobertura não fecha."
        tone="unknown"
      >
        <p style={{ color: 'var(--muted)', fontSize: '.75rem', lineHeight: 1.55, margin: '.5rem 0 0' }}>
          Sanções e mídia adversa falharam após três tentativas. O que foi verificado não apontou nada; o que não foi verificado continua em aberto.
        </p>
      </RiskVerdict>
    </div>
  );
}
```
