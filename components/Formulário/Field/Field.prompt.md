Field from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Field` (bundle loaded from the root `_ds_bundle.js`).

Rótulo, campo e ajuda — a unidade de formulário do produto.

O rótulo é sempre visível e ligado ao campo por `htmlFor`; placeholder não é
rótulo. A ajuda fica abaixo, em cinza, e some quando não há o que explicar.

Validação segue o app: `error` é a caixa vermelha do login
(`.auth-form-error`, `role="alert"`); `validHint` é a confirmação verde da
busca de entidade (`.valid-hint`, `aria-live="polite"` — "CNPJ válido").
Só um dos dois aparece; erro ganha. O Field não alcança o filho, então quem
monta o input é que liga `aria-invalid` e `aria-describedby={feedbackId}`,
exatamente como o app faz no passo de busca.

## Props

```ts
interface FieldProps {
  /** O `input`, `select` ou `textarea`. */
  children: React.ReactNode;
  /** Mensagem de erro de validação. Presente, esconde `validHint`. */
  error?: React.ReactNode;
  /** id da mensagem de feedback — aponte o `aria-describedby` do input para ele. */
  feedbackId?: string;
  hint?: React.ReactNode;
  htmlFor?: string;
  label: React.ReactNode;
  /** Confirmação positiva de validação, ex.: "CNPJ válido — Agropecuária Boa Vista S.A.". */
  validHint?: React.ReactNode;
}
```

## Examples

### Formulario

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '1rem', width: '24rem' }}>
      <Field hint="CPF ou CNPJ, com ou sem pontuação." htmlFor="doc" label="Documento da entidade">
        <input defaultValue="12.345.678/0001-90" id="doc" />
      </Field>
      <Field htmlFor="policy" label="Política de risco">
        <select defaultValue="v4" id="policy">
          <option value="v4">Crédito PJ — v4 (vigente)</option>
          <option value="v3">Crédito PJ — v3</option>
        </select>
      </Field>
    </div>
  );
}

/** Erro em caixa vermelha (role=alert); confirmação em verde. O input aponta aria-describedby para o feedbackId. */
```

### Validacao

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '1.25rem', width: '24rem' }}>
      <Field error="CNPJ inválido: o dígito verificador não confere. Revise o número informado." feedbackId="cnpj-feedback" htmlFor="cnpj" label="CNPJ da contraparte">
        <input aria-describedby="cnpj-feedback" aria-invalid defaultValue="12.345.678/0001-99" id="cnpj" />
      </Field>
      <Field feedbackId="cpf-feedback" htmlFor="cpf" label="CPF do representante" validHint="CPF válido — pronto para a busca no cadastro.">
        <input aria-describedby="cpf-feedback" defaultValue="529.982.247-25" id="cpf" />
      </Field>
    </div>
  );
}
```
