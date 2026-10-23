Badge from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Badge` (bundle loaded from the root `_ds_bundle.js`).

O estado de um item, em pílula.

Cinco tons, e a distinção entre os dois últimos é a regra do produto: `gap` é
"não foi verificado", `neutral` é informação sem juízo. Nenhum dos dois é `ok`.
O texto tem de dizer o estado sozinho — a cor é reforço, nunca o único sinal.

## Props

```ts
interface BadgeProps {
  children: React.ReactNode;
  tone: "ok" | "attention" | "critical" | "gap" | "neutral";
}
```

## Examples

### Tons

```jsx
() => {
  return (
    <div style={ROW}>
      <Badge tone="ok">Verificado</Badge>
      <Badge tone="attention">Atenção</Badge>
      <Badge tone="critical">Crítico</Badge>
      <Badge tone="gap">Lacuna de cobertura</Badge>
      <Badge tone="neutral">Não aplicável</Badge>
    </div>
  );
}

/** Em uso: o estado à direita de um item de checklist. */
```

### NaLinha

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.55rem', width: '26rem' }}>
      {[
        ['Quadro societário completo', 'ok', 'Verificado'],
        ['Processos judiciais nos últimos 5 anos', 'attention', '3 em andamento'],
        ['Sanções e listas restritivas', 'critical', 'Consta em lista'],
        ['Mídia adversa', 'gap', 'Fonte indisponível'],
      ].map(([label, tone, state]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', fontSize: '.75rem' }}>
          <span>{label}</span>
          <Badge tone={tone as 'ok'}>{state}</Badge>
        </div>
      ))}
    </div>
  );
}
```
