Popover from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Popover` (bundle loaded from the root `_ds_bundle.js`).

Painel não-modal ancorado a um gatilho — o lugar de uma explicação longa
demais para tooltip, de um resumo de cobertura de fontes, de um mini-form
de filtro. Reusa o vocabulário do seletor de entidade do app
(`entity-picker-trigger`/`entity-picker-panel`): gatilho com linha forte +
detalhe e painel elevado ancorado logo abaixo.

Não-modal de verdade: o foco NÃO fica preso (Tab sai do painel), não há
`aria-modal`, e por isso também não há backdrop — quem clica fora fecha e
já interage com o que clicou. Escape fecha e devolve o foco ao gatilho.

`open` é controlado pelo caller — regra da casa para a preview estática
conseguir mostrar o estado aberto.

## Props

```ts
interface PopoverProps {
  /** `end` alinha o painel à direita — para gatilhos rentes à borda da tela. */
  align?: "start" | "end";
  children: React.ReactNode;
  /** Ações do rodapé, separadas por um fio de borda. */
  footer?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  /** Nomeia o painel (`aria-label` do dialog) e vira o cabeçalho visível. */
  title: string;
  /** Linha forte do gatilho. */
  trigger: React.ReactNode;
  /** Linha pequena sob o gatilho — o resumo do estado atual. */
  triggerDetail?: React.ReactNode;
}
```

## Examples

### CoberturaDaConsulta

```jsx
() => {
  return (
    <div style={{ minHeight: '21rem', width: '22rem' }}>
      <Popover
        footer={<Button variant="secondary">Gerenciar fontes</Button>}
        onOpenChange={() => {}}
        open
        title="Cobertura da consulta"
        trigger="Fontes da consulta"
        triggerDetail="12 ativas · atualizada há 2 h"
      >
        <p style={{ color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
          Consulta de 26/08/2026 sobre AGRO FORTE PARTICIPAÇÕES LTDA
          (CNPJ 12.345.678/0001-90).
        </p>
        <ul style={{ display: 'grid', gap: '.3rem', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><strong>Receita Federal (CNPJ)</strong> — atualizada</li>
          <li><strong>CNDT — Justiça do Trabalho</strong> — atualizada</li>
          <li><strong>Processos judiciais</strong> — parcial: TJBA fora do ar</li>
          <li><strong>Mídia negativa</strong> — pendente de créditos</li>
        </ul>
      </Popover>
    </div>
  );
}

/** Alinhado à direita, para gatilho rente à borda. */
```

### AlinhadoADireita

```jsx
() => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', minHeight: '13rem', width: '26rem' }}>
      <div style={{ width: '14rem' }}>
        <Popover
          align="end"
          onOpenChange={() => {}}
          open
          title="Critério do alerta"
          trigger="Alerta de sócio em comum"
          triggerDetail="Regra QSA-07"
        >
          <p style={{ color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
            Dispara quando dois fornecedores da carteira compartilham sócio
            com participação acima de 25% nos últimos 5 anos.
          </p>
        </Popover>
      </div>
    </div>
  );
}
```
