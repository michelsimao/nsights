DatePicker from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.DatePicker` (bundle loaded from the root `_ds_bundle.js`).

Campo de período pt-BR: exibe dd/mm/aaaa, troca valores em ISO. De propósito
NÃO há calendário — na operação de risco o período é quase sempre um atalho
("Últimos 30 dias", "Este ano"); quem precisa de data exata digita mais
rápido do que clica em grade de mês. O painel traz os atalhos e dois campos
de digitação livre, validados no blur/Enter (entrada inválida é revertida,
nunca propagada).

O painel é CONTROLADO (`open`/`onOpenChange`): quem decide se ele está
aberto é o chamador — e é isso que permite à preview estática mostrar o
estado aberto. Escape fecha; os atalhos vêm prontos em ISO do chamador,
porque o componente não computa "hoje".

## Props

```ts
interface DatePickerProps {
  label?: string;
  /** Início e fim em ISO (aaaa-mm-dd); `null` limpa. */
  onChange?: (start: string | null, end: string | null) => void;
  onOpenChange?: (open: boolean) => void;
  /** Estado do painel — controlado pelo chamador. */
  open?: boolean;
  presets?: DatePreset[];
  /** Início do período, ISO. */
  value?: string;
  /** Fim do período, ISO. */
  valueEnd?: string;
}
```

## Examples

### PainelAberto

```jsx
() => {
  return (
    <div style={{ minHeight: 360, width: 340 }}>
      <DatePicker
        label="Período das diligências"
        open
        presets={[
          { label: 'Últimos 30 dias', range: ['2026-07-29', '2026-08-28'] },
          { label: 'Últimos 90 dias', range: ['2026-05-30', '2026-08-28'] },
          { label: 'Este ano', range: ['2026-01-01', '2026-08-28'] },
        ]}
        value="2026-07-29"
        valueEnd="2026-08-28"
      />
    </div>
  );
}

/** Fechado e vazio: o placeholder ensina o formato. */
```

### CampoFechado

```jsx
() => {
  return (
    <div style={{ width: 340 }}>
      <DatePicker
        label="Período do extrato"
        presets={[
          { label: 'Últimos 30 dias', range: ['2026-07-29', '2026-08-28'] },
          { label: 'Este ano', range: ['2026-01-01', '2026-08-28'] },
        ]}
      />
    </div>
  );
}
```
