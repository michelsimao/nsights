CommandPalette from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.CommandPalette` (bundle loaded from the root `_ds_bundle.js`).

Paleta de comandos (Cmd+K): campo de busca + lista filtrada por grupos.
Reusa a moldura do seletor de fontes do app (`overlay` + `selector` +
`sel-search`/`sel-body`/`sel-gr`) — é a mesma cena de "escolher numa lista
grande", só que disparada pelo teclado; as linhas de comando são novas
(`ns-cmd-item`) porque a `selrow` do app é uma linha de checkbox.

O caller é dono do atalho global que abre a paleta e do estado `open` —
regra da casa, e é o que deixa a preview estática mostrá-la aberta.
Dentro: setas movem a seleção ativa, Enter executa, Escape e clique no
fundo fecham. O rodapé imprime as teclas — atalho que ninguém descobre
não existe.

## Props

```ts
interface CommandPaletteProps {
  items: CommandItem[];
  onClose?: () => void;
  open: boolean;
  placeholder?: string;
}
```

## Examples

### Paleta

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface)', height: '38rem', overflow: 'hidden', position: 'relative', transform: 'translateZ(0)', width: '55rem' }}>
      <CommandPalette
        items={[
          { group: 'Ir para', icon: <IconFolder />, id: 'carteira', label: 'Carteira de análises' },
          { group: 'Ir para', icon: <IconSearch />, id: 'consultas', label: 'Consultas em andamento' },
          { group: 'Ir para', icon: <IconCoin />, id: 'creditos', label: 'Créditos e consumo' },
          { group: 'Ir para', icon: <IconDatabase />, id: 'fontes', label: 'Fontes de dados' },
          { group: 'Ações', icon: <IconPlus />, id: 'nova-analise', label: 'Nova análise de entidade', shortcut: '⌘N' },
          { group: 'Ações', icon: <IconRefresh />, id: 'reprocessar', label: 'Reprocessar verificação atual' },
        ]}
        onClose={() => {}}
        open
      />
    </div>
  );
}
```
