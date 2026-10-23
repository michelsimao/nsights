AiTrace from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiTrace` (bundle loaded from the root `_ds_bundle.js`).

A trilha de consultas de uma resposta da IA: qual base foi consultada, com
qual recorte, e em que estado terminou. Fechada por padrão — quem confia
não abre, quem audita abre.

Regra de produto: um passo que falhou PERMANECE na lista com a palavra
"Falhou" na pílula — sumir com ele esconderia o furo da resposta. E são
`details`/`summary` nativos, como no app: abre por teclado sem script.

## Props

```ts
interface AiTraceProps {
  steps: AiTraceStep[];
}
```

## Examples

### TrilhaDaResposta

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <AiTrace
        steps={[
          { name: 'Receita Federal — cadastro CNPJ', state: 'output-available' },
          { name: 'Processos judiciais — tribunais estaduais', state: 'output-available' },
          { name: 'Certidões trabalhistas — TST', state: 'output-error' },
          { name: 'Mídia e reputação', state: 'input-available' },
        ]}
      />
    </div>
  );
}

/** Aberto para auditoria: o recorte da consulta e o motivo do erro à vista. */
```

### AuditandoConsultas

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <AiTrace
        steps={[
          {
            detail: 'CNPJ 12.345.678/0001-90 · situação cadastral, QSA e CNAE · 1 registro',
            name: 'Receita Federal — cadastro CNPJ',
            open: true,
            state: 'output-available',
          },
          {
            detail: 'Consulta ao distribuidor do TST não respondeu em 30 s. A resposta segue sem certidões trabalhistas — lacuna declarada no resumo.',
            name: 'Certidões trabalhistas — TST',
            open: true,
            state: 'output-error',
          },
        ]}
      />
    </div>
  );
}
```
