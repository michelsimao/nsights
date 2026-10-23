import * as React from 'react';

/**
 * AiAsk — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiAskProps {
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

export declare const AiAsk: React.ComponentType<AiAskProps>;
