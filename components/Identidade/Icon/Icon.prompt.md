Icon from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Icon` (bundle loaded from the root `_ds_bundle.js`).

A biblioteca de ícones do app, com nome do domínio em pt-BR — `processos`,
`societario`, `midia` — nunca o nome genérico do desenho. Os paths são os
MESMOS que o app traça em result-tab-icons, navigation e nos SVGs avulsos;
mudar a fonte de ícones um dia é mexer só neste registro.

Acessibilidade: sem `label` o ícone é decorativo (`aria-hidden`); com
`label` vira `role="img"` com `<title>`. Um botão só de ícone precisa do
rótulo no botão, não aqui.

## Props

```ts
interface IconProps {
  /** Só quando o ícone É a informação. Vazio = decorativo. */
  label?: string;
  name: unknown;
  /** Lado do quadrado em px. 16 acompanha texto corrido. */
  size?: number;
}
```

## Examples

### Catalogo

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(7.5rem, 1fr))', width: '44rem' }}>
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            alignItems: 'center',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border)',
            borderRadius: '.45rem',
            color: 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            gap: '.45rem',
            padding: '.7rem .4rem',
          }}
        >
          <Icon name={name} size={18} />
          <span className="mono" style={{ color: 'var(--muted)', fontSize: '.62rem' }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

/** Decorativo acompanha texto; sozinho, leva `label` e vira `role="img"`. */
```

### AoLadoDoTexto

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.6rem', width: '22rem' }}>
      <span style={{ alignItems: 'center', color: 'var(--text)', display: 'flex', fontSize: '.78rem', gap: '.4rem' }}>
        <Icon name="processos" size={16} /> 14 processos judiciais localizados
      </span>
      <span style={{ alignItems: 'center', color: 'var(--danger)', display: 'flex', fontSize: '.78rem', gap: '.4rem' }}>
        <Icon name="aviso" size={16} /> Fonte regulatória indisponível na coleta
      </span>
      <span style={{ alignItems: 'center', color: 'var(--muted)', display: 'flex', fontSize: '.78rem', gap: '.4rem' }}>
        <Icon label="Sociedade" name="societario" size={16} /> ACME Participações S.A.
      </span>
    </div>
  );
}
```
