AvatarStack from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AvatarStack` (bundle loaded from the root `_ds_bundle.js`).

Fileira sobreposta de `Avatar` para resumir um lote de entidades sem listar
todas. Passado o limite, o excedente vira um chip "+n" — no mesmo
`entity-monogram` que o app já usa para pintar contagens na barra de seleção.

Pensada para avatares `monogram`; misturar tamanhos quebra a sobreposição.

## Props

```ts
interface AvatarStackProps {
  children: React.ReactNode;
  /** Descrição do conjunto para leitores de tela (ex.: "6 entidades no lote"). */
  label?: string;
  max?: number;
}
```

## Examples

### Lote

```jsx
() => {
  return (
    <AvatarStack label="6 entidades no lote" max={4}>
      <Avatar name="ACME Participações" />
      <Avatar name="Meridiano Logística" />
      <Avatar name="Vetor Agro" />
      <Avatar name="Horizonte Energia" />
      <Avatar name="Delta Comércio" />
      <Avatar name="Sul Mineração" />
    </AvatarStack>
  );
}
```
