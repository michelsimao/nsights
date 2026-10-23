AiAsk from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiAsk` (bundle loaded from the root `_ds_bundle.js`).

O composer de pergunta do agente: textarea, anexos, seletor de fontes e o
botão de envio roxo.

Enter envia e Shift+Enter quebra linha — quem cola uma lista de CNPJs quebra
linha o tempo todo, e é por isso que o envio nunca dispara com Shift. As
sugestões (`suggestions`) apenas preenchem o campo via `onPick`; enviar
continua sendo uma decisão explícita, porque cada envio pode virar escopo
cobrado. Durante `busy` o envio fica desabilitado (o app não oferece
cancelamento no meio da resposta) e o rótulo pode trocar via `busyLabel`,
como o "Iniciando…" da primeira consulta.

O estado é controlado (`value`/`onChange`) — o chamador é quem decide zerar
o campo após o envio, exatamente como o app faz com o draft.

## Props

```ts
interface AiAskProps {
  /** Texto do campo. Sempre controlado. */
  value: string;
  onChange: (value: string) => void;
  /** Recebe o texto no Enter ou no clique em enviar. Não é chamado vazio nem durante `busy`. */
  onSubmit?: (value: string) => void;
  /** Resposta em andamento: desabilita o envio, como no app. */
  busy?: boolean;
  /** Rótulo do envio durante `busy` (ex.: "Iniciando…"). Sem ele, mantém `submitLabel`. */
  busyLabel?: string;
  submitLabel?: string;
  /** Rótulo acessível do textarea. */
  label?: string;
  placeholder?: string;
  /** Linhas do textarea. Sem valor, segue o app: 2 no rodapé do chat, 3 na abertura. */
  rows?: number;
  /** Modo rodapé do chat: envolve o composer em `.composer-foot` (borda superior, sombra menor) e mostra as sugestões como ch */
  docked?: boolean;
  /** Perguntas prontas dos chips (só no modo `docked`). */
  suggestions?: string[];
  /** Sugestão clicada — preencha o campo; o envio continua manual. */
  onPick?: (suggestion: string) => void;
  /** Com handler, o botão de anexar aparece à esquerda. */
  onAttach?: () => void;
  /** Title do botão de anexar, com os formatos aceitos. */
  attachTitle?: string;
  attachments?: AiAskAttachment[];
  onRemoveAttachment?: (id: string) => void;
  /** Com handler, o botão roxo-claro "Selecionar fontes" aparece na barra. */
  onOpenSources?: () => void;
  sourcesLabel?: string;
  /** Erro de upload/envio, anunciado como alerta abaixo dos anexos. */
  error?: string;
}
```

## Examples

### Abertura

```jsx
() => {
  return (
    <div style={{ width: '40rem' }}>
      <AiAsk
        onAttach={() => {}}
        onChange={() => {}}
        onOpenSources={() => {}}
        onSubmit={() => {}}
        value="Situação cadastral e processos judiciais da Agropecuária Santa Fé S.A., CNPJ 12.345.678/0001-90"
      />
    </div>
  );
}

/** Docked no rodapé do chat: chips de pergunta pronta acima do campo. */
```

### RodapeDoChat

```jsx
() => {
  return (
    <div style={{ width: '40rem' }}>
      <AiAsk
        docked
        onAttach={() => {}}
        onChange={() => {}}
        onPick={() => {}}
        onSubmit={() => {}}
        placeholder="Pergunte sobre este resultado ou inicie outra consulta…"
        suggestions={['Resumir riscos', 'Detalhar processos', 'Sócios em comum?']}
        value=""
      />
    </div>
  );
}

/** Lote anexado e um arquivo recusado: os chips e o alerta de upload. */
```

### ComAnexos

```jsx
() => {
  return (
    <div style={{ width: '40rem' }}>
      <AiAsk
        attachments={[
          { id: 'u1', name: 'fornecedores-sul-2026.xlsx', size: '84 KB' },
          { id: 'u2', name: 'contratos-vigentes.csv', size: '12 KB' },
        ]}
        error="Formato não aceito. Use CSV, XLSX, imagem (PNG, JPEG, WebP), Markdown ou TXT."
        onAttach={() => {}}
        onChange={() => {}}
        onRemoveAttachment={() => {}}
        onSubmit={() => {}}
        value="Analise este lote de fornecedores: cadastro, processos e listas restritivas."
      />
    </div>
  );
}
```
