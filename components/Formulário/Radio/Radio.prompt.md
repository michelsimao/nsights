Radio from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Radio` (bundle loaded from the root `_ds_bundle.js`).

Escolha única em linha de lista — quando as opções não pedem o peso do
`SelectableCard` (que é o padrão do assistente para escopo e modelo).

Mesma anatomia do `Checkbox`: label inteiro clicável, input real escondido
(`.sr-input`), marca visual `aria-hidden`. A bolinha `ns-radio` copia os
valores do `.scope-radio` do app (borda 1.5px `--border-strong`, 1.05rem,
ponto branco de .35rem quando marcada) — o app só desenha rádio dentro do
scope-card, então a versão avulsa é extensão, com os mesmos números.

Um rádio sozinho não se desmarca: use sempre dentro de `RadioGroup`, com o
mesmo `name` em todas as opções. Para liga/desliga, é `Switch` ou `Checkbox`.

## Props

```ts
interface RadioProps {
  checked?: boolean;
  /** Linha miúda sob o rótulo — consequência da escolha, custo, ressalva. */
  description?: React.ReactNode;
  disabled?: boolean;
  /** Glifo de categoria no quadradinho roxo (`.si`), SVG de traço. Sem ele a linha encolhe para duas colunas. */
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** O mesmo em todas as opções do grupo — é o que faz o navegador tratá-las como exclusivas. */
  name: string;
  onSelect?: (value: string) => void;
  value: string;
}
```

## Examples

### AbrangenciaDaAnalise

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <RadioGroup legend="Abrangência da análise">
        <Radio description="1 crédito — CNPJ 12.345.678/0001-90 apenas" icon={entityIcon} label="Somente a entidade" name="abrangencia" value="entidade" />
        <Radio checked description="3 créditos — inclui sócios com participação direta" icon={partnersIcon} label="Entidade e sócios diretos" name="abrangencia" value="socios" />
        <Radio description="6 créditos — sócios e empresas coligadas" icon={groupIcon} label="Sócios e grupo econômico" name="abrangencia" value="grupo" />
      </RadioGroup>
    </div>
  );
};

/** Sem ícone a linha encolhe para duas colunas; disabled para opção indisponível. */
```

### PrioridadeDaFila

```jsx
() => {
  return (
    <div style={{ width: '22rem' }}>
      <RadioGroup legend="Prioridade de processamento">
        <Radio checked description="Resultado em até 2 horas úteis" label="Normal" name="prioridade" value="normal" />
        <Radio description="Fura a fila da organização" label="Urgente" name="prioridade" value="urgente" />
        <Radio description="Disponível no plano Enterprise" disabled label="Tempo real" name="prioridade" value="tempo-real" />
      </RadioGroup>
    </div>
  );
}
```

## Related

`RadioGroup`
