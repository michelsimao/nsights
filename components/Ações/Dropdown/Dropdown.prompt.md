Dropdown from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Dropdown` (bundle loaded from the root `_ds_bundle.js`).

Menu de ações ancorado a um botão — o "Ações" no fim de uma linha da
carteira, o kebab de um cartão de fonte. O app não tinha esse padrão
genérico (cada tela resolvia com botões soltos), então o vocabulário é novo
(`ns-menu`), desenhado sobre o menu ancorado que já existe no QSA.

Ações destrutivas ("Excluir da carteira") ficam no fim, depois de um
separador e com `tone: 'danger'` — a distância física é o que evita o
clique errado num menu aberto às pressas.

Teclado: setas circulam pelos itens, Home/End vão às pontas, Escape fecha e
devolve o foco ao gatilho. `open` é controlado (preview estática mostra o
menu aberto); itens desabilitados continuam focáveis para o leitor de tela
poder anunciá-los.

## Props

```ts
interface DropdownProps {
  /** `end` alinha o menu à direita do gatilho — para gatilhos rentes à borda. */
  align?: "start" | "end";
  /** Nome do menu para leitores de tela (o gatilho pode ser só um ícone). */
  ariaLabel: string;
  items: DropdownItem[];
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  /** Conteúdo do botão-gatilho; o chevron o componente acrescenta. */
  trigger: React.ReactNode;
}
```

## Examples

### AcoesDoDossie

```jsx
() => {
  return (
    <div style={{ minHeight: '19rem', width: '24rem' }}>
      <Dropdown
        ariaLabel="Ações do dossiê"
        items={[
          { id: 'sec-dossie', label: 'Dossiê', type: 'label' },
          { icon: <IconOpen />, id: 'abrir', label: 'Abrir resultado completo' },
          { icon: <IconPdf />, id: 'exportar', label: 'Exportar dossiê (PDF)', shortcut: '⌘E' },
          { id: 'sep-1', type: 'sep' },
          { id: 'sec-verificacao', label: 'Verificação', type: 'label' },
          { icon: <IconRefresh />, id: 'reprocessar', label: 'Reprocessar com fontes atuais' },
          { disabled: true, id: 'agendar', label: 'Agendar reprocessamento' },
          { id: 'sep-2', type: 'sep' },
          { icon: <IconTrash />, id: 'excluir', label: 'Excluir da carteira', tone: 'danger' },
        ]}
        open
        trigger="Ações"
      />
    </div>
  );
}

/** Fechado: só o gatilho com o chevron. */
```

### Fechado

```jsx
() => {
  return (
    <div style={{ width: '24rem' }}>
      <Dropdown
        ariaLabel="Ações do dossiê"
        items={[
          { icon: <IconOpen />, id: 'abrir', label: 'Abrir resultado completo' },
          { icon: <IconPdf />, id: 'exportar', label: 'Exportar dossiê (PDF)', shortcut: '⌘E' },
        ]}
        open={false}
        trigger="Ações"
      />
    </div>
  );
}
```
