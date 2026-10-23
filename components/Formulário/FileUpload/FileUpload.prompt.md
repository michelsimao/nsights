FileUpload from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.FileUpload` (bundle loaded from the root `_ds_bundle.js`).

A zona de soltar arquivos, com a lista de anexos embaixo.

O componente não envia nada — quem chama é dono da requisição e devolve o
andamento pelo array `files`. A zona é um `label` com o `input type="file"`
invisível por cima, como no app: teclado e leitor de tela chegam pelo input;
arrastar é atalho, nunca o único caminho.

Erros têm dois níveis de propósito distinto: o erro por arquivo fica na linha
do anexo (este CSV recusado não invalida os outros), e o erro do lote
(`error`) sai como faixa `role="alert"` — é a regra que barrou a operação
inteira, como o limite de 25 MB por mensagem.

## Props

```ts
interface FileUploadProps {
  /** Extensões aceitas pelo input ("csv,.xlsx"). Diga o limite real no `hint`. */
  accept?: string;
  /** Erro do lote inteiro — a faixa vermelha sob a lista. */
  error?: string;
  files?: UploadFile[];
  /** Linha menor sob o título ("ou clique para selecionar (.csv, .xlsx)"). */
  hint?: string;
  /** Rótulo em caixa alta acima da zona. */
  label?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  /** Chamada da zona vazia. */
  title?: string;
}
```

## Examples

### Vazio

```jsx
() => {
  return (
    <div style={{ width: '24rem' }}>
      <FileUpload
        accept=".csv,.xlsx"
        hint="ou clique para selecionar (.csv, .xlsx)"
        label="Arquivo CSV ou XLSX"
        onFiles={() => {}}
        title="Arraste um arquivo aqui"
      />
    </div>
  );
}

/** Lote em envio: um arquivo subindo, um concluído, um recusado na linha. */
```

### Enviando

```jsx
() => {
  return (
    <div style={{ width: '24rem' }}>
      <FileUpload
        accept=".csv,.xlsx,.pdf"
        files={[
          { name: 'quadro-societario-acme.xlsx', onRemove: () => {}, progress: 62 },
          { name: 'contrato-social-consolidado.pdf', onRemove: () => {}, size: '1,8 MB' },
          { error: 'Formato não aceito. Use CSV, XLSX ou PDF.', name: 'sancoes-ofac.zip', onRemove: () => {} },
        ]}
        hint="ou clique para selecionar (.csv, .xlsx, .pdf)"
        label="Documentos da diligência"
        multiple
        onFiles={() => {}}
        title="Arraste os arquivos aqui"
      />
    </div>
  );
}

/** O limite do lote barrou o envio inteiro: faixa de alerta sob a lista. */
```

### LoteRecusado

```jsx
() => {
  return (
    <div style={{ width: '24rem' }}>
      <FileUpload
        accept=".csv,.xlsx"
        error="Limite excedido (máx. 10 arquivos, 10 MB por arquivo, 25 MB no total)."
        files={[
          { name: 'clientes-carteira-sul.xlsx', onRemove: () => {}, size: '9,4 MB' },
          { name: 'fornecedores-2025.xlsx', onRemove: () => {}, size: '8,9 MB' },
          { name: 'socios-holding.csv', onRemove: () => {}, size: '7,2 MB' },
        ]}
        hint="ou clique para selecionar (.csv, .xlsx)"
        label="Base para triagem em lote"
        multiple
        onFiles={() => {}}
        title="Arraste os arquivos aqui"
      />
    </div>
  );
}
```
