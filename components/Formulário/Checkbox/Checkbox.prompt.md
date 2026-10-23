Checkbox from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Checkbox` (bundle loaded from the root `_ds_bundle.js`).

A linha de seleção múltipla do produto — consultas no seletor do agente,
coberturas em listas de escolha.

O `<label>` inteiro é o alvo de clique (input real escondido via `.sr-input`);
a caixa `.cbx` é decoração `aria-hidden`, como no seletor de consultas do app.
`indeterminate` existe para o cabeçalho "selecionar todas" quando só parte da
lista está marcada: o estado vai no DOM via ref (React não o expressa como
atributo) e a caixa acende com um traço no lugar do check — mesma classe
`cbx on`, só muda o glifo, então nenhum CSS novo é preciso para o estado.

## Props

```ts
interface CheckboxProps {
  checked?: boolean;
  /** Linha miúda sob o rótulo — a dica de escopo da consulta. */
  description?: React.ReactNode;
  disabled?: boolean;
  /** Glifo de categoria no quadradinho roxo (`.si`), SVG de traço. Sem ele a linha encolhe para duas colunas. */
  icon?: React.ReactNode;
  /** Marcação parcial ("2 de 4"). Anuncia como `mixed` para leitores de tela. */
  indeterminate?: boolean;
  label: React.ReactNode;
  name?: string;
  onChange?: (checked: boolean) => void;
  value?: string;
}
```

## Examples

### SelecaoDeConsultas

```jsx
() => {
  return (
    <div style={{ display: 'grid', width: '26rem' }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: '0 .6rem .3rem' }}>
        <strong style={{ fontSize: '.75rem' }}>3 consultas selecionadas</strong>
        <SelectAllButton allSelected={false} />
      </div>
      <Checkbox checked description="CNPJ, sócios e participações na Receita Federal" icon={ownershipIcon} label="Quadro societário e controle" name="consultas" value="qsa" />
      <Checkbox checked description="Distribuições nos tribunais estaduais e federais" icon={judicialIcon} label="Processos judiciais" name="consultas" value="judicial" />
      <Checkbox checked description="OFAC, ONU, UE e PEP nacional" icon={complianceIcon} label="Listas restritivas e sanções" name="consultas" value="listas" />
      <Checkbox description="Menções adversas em veículos de imprensa" icon={mediaIcon} label="Mídia negativa" name="consultas" value="midia" />
    </div>
  );
};

/** Indeterminado: o cabeçalho quando só parte da lista está marcada. */
```

### MarcacaoParcial

```jsx
() => {
  return (
    <div style={{ display: 'grid', width: '26rem' }}>
      <Checkbox indeterminate label="Certidões" description="2 de 4 certidões selecionadas" name="certidoes" value="todas" />
      <div style={{ paddingLeft: '1.4rem' }}>
        <Checkbox checked label="CND federal (Receita/PGFN)" name="certidoes" value="cnd" />
        <Checkbox checked label="Certidão trabalhista (TST)" name="certidoes" value="tst" />
        <Checkbox label="Certidão estadual de tributos" name="certidoes" value="estadual" />
        <Checkbox disabled label="FGTS — regularidade do empregador" name="certidoes" value="fgts" />
      </div>
    </div>
  );
}
```
