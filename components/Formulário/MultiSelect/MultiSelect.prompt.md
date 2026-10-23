MultiSelect from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.MultiSelect` (bundle loaded from the root `_ds_bundle.js`).

Seleção múltipla compacta de filtro — status de processo, tribunais, UFs.
É o espelho do multi-select granular do QSA: gatilho que resume a seleção
em contagem ("2 selecionadas"), menu ancorado com busca, checkboxes e o
rodapé Limpar / Selecionar todas.

O resumo em contagem (e não a lista de nomes) é decisão de produto: o
controle vive em barras de filtro apertadas e o rótulo não pode crescer com
a seleção. Quando a tela tem espaço e a seleção precisa ficar visível,
ligue `chips` — cada valor vira uma pílula removível abaixo do gatilho.

`open` é controlado pelo caller (a preview estática precisa mostrar o menu
aberto); a busca interna é estado local porque não sobrevive ao fechamento.

## Props

```ts
interface MultiSelectProps {
  /** Mostra a seleção como pílulas removíveis abaixo do gatilho. */
  chips?: boolean;
  /** Rótulo do gatilho quando nada está selecionado (nada = sem filtro). */
  emptyLabel?: string;
  label: string;
  onChange: (values: string[]) => void;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  options: MultiSelectOption[];
  selected: string[];
}
```

## Examples

### StatusDoProcesso

```jsx
() => {
  return (
    <div style={{ minHeight: '21rem', width: '15rem' }}>
      <MultiSelect
        label="Status"
        onChange={() => {}}
        open
        options={[
          { label: 'Em andamento', value: 'andamento' },
          { label: 'Suspenso', value: 'suspenso' },
          { label: 'Arquivado', value: 'arquivado' },
          { label: 'Baixado', value: 'baixado' },
          { label: 'Extinto sem mérito', value: 'extinto' },
        ]}
        selected={['andamento', 'suspenso']}
      />
    </div>
  );
}

/** Fechado, com a seleção visível em chips removíveis. */
```

### TribunaisComChips

```jsx
() => {
  return (
    <div style={{ width: '17rem' }}>
      <MultiSelect
        chips
        label="Tribunais"
        onChange={() => {}}
        open={false}
        options={[
          { label: 'TJSP', value: 'tjsp' },
          { label: 'TJRJ', value: 'tjrj' },
          { label: 'TRF-3', value: 'trf3' },
          { label: 'TST', value: 'tst' },
          { label: 'TJMG', value: 'tjmg' },
        ]}
        selected={['tjsp', 'trf3', 'tst']}
      />
    </div>
  );
}
```
