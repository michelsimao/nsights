StatusBadge from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.StatusBadge` (bundle loaded from the root `_ds_bundle.js`).

O estado de uma verificação do checklist, com o ponto colorido à esquerda.

Os dois últimos carregam a distinção central do produto: `empty` é "não se
aplica" (não é lacuna); `gap` é "não foi verificado" — pré-requisito ausente,
fonte falhou ou nunca ligada. Nunca rotule nenhum dos dois como "Sem dado":
esse rótulo já cobriu quatro situações diferentes e o motivo real é o rótulo.

## Props

```ts
interface StatusBadgeProps {
  /** O que a pílula diz. Em `gap`/`empty`, o motivo — não "Sem dado". */
  label: string;
  status: "attention" | "critical" | "gap" | "regular" | "empty";
}
```

## Examples

### Estados

```jsx
() => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', alignItems: 'center' }}>
      <StatusBadge label="Verificado" status="regular" />
      <StatusBadge label="Atenção" status="attention" />
      <StatusBadge label="Crítico" status="critical" />
      <StatusBadge label="Fonte indisponível" status="gap" />
      <StatusBadge label="Não aplicável" status="empty" />
    </div>
  );
}

/** `gap` e `empty` dizem o motivo — nunca "Sem dado". */
```

### MotivosDeLacuna

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.4rem', justifyItems: 'start' }}>
      <StatusBadge label="Não aplicável" status="empty" />
      <StatusBadge label="Pré-requisito ausente" status="gap" />
      <StatusBadge label="Fonte indisponível" status="gap" />
      <StatusBadge label="Fonte não contratada" status="gap" />
    </div>
  );
}
```
