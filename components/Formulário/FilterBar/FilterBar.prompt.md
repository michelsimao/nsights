FilterBar from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.FilterBar` (bundle loaded from the root `_ds_bundle.js`).

Barra de filtros do console — mais baixa e mais clara que `Toolbar`, para
ficar acima de um painel de análise em vez de acima da página inteira.

## Props

```ts
interface FilterBarProps {
  ariaLabel: string;
  children: React.ReactNode;
}
```

## Examples

### Barra

```jsx
() => {
  return (
    <div style={{ width: '36rem' }}>
      <FilterBar ariaLabel="Filtros do console">
        <select defaultValue="90">
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
        </select>
        <Segmented
          ariaLabel="Recorte"
          options={[{ id: 'todas', label: 'Todas' }, { id: 'risco', label: 'Com risco' }, { id: 'lacuna', label: 'Com lacuna' }]}
          value="risco"
        />
      </FilterBar>
    </div>
  );
}
```
