# Etapa 5: integração do DS e shell do frontend (relatório)

- **Commit:** `PENDENTE`, no branch `main`
- **Data:** 2026-10-23
- **Status:** concluída. Todos os critérios de aceite foram atendidos.

## Resultado

O front agora é uma SPA autenticada montada com os componentes reais do Design System:
- login real contra a API, com os usuários do seed;
- shell com `AppShell`, `Sidebar` (recolhível), `Topbar` e `MobileNavigation`;
- rotas protegidas com React Router, que lembram o destino e voltam a ele depois do login;
- sessão restaurada ao recarregar e encerrada quando o token expira ou é recusado.

As telas de negócio (Resumo, Casos, Novo caso, Caso, Entidades) já têm rota e cabeçalho, com um aviso "Em construção". O conteúdo delas é a Etapa 6.

## Verificações

Feitas com Chrome headless (Playwright) contra o `npm run dev` e contra o build de produção servido pelo nginx no Docker. As 26 checagens passaram nos dois.

| Verificação | Resultado |
|---|---|
| Loader do DS: um componente do DS com hooks próprios (`ScreenDashboard`, `useState`) montado no app | o estado muda ao clicar; `window.React` é o mesmo módulo que o `react-dom` usa |
| Console do navegador em todo o roteiro | nenhum erro ou aviso de React (sem "Invalid hook call", sem React duplicado). Só aparecem os 401/502 de rede provocados de propósito |
| Rota protegida sem sessão (`/casos?status=aberto`) | vai para `/login`; depois do login volta para `/casos?status=aberto` |
| Senha errada | banner "Email ou senha inválidos." e a senha é limpa |
| Login de analista e de admin | Topbar mostra nome e papel ("Analista" / "Administrador") |
| Recarregar a página | a sessão continua (via `GET /api/auth/me`), e a Sidebar mantém o estado recolhido/expandido |
| Navegação pela Sidebar e pelo "Novo caso" | troca de rota sem recarregar a página; item da rota atual marcado com `aria-current` |
| Token com `exp` no passado | volta ao login com "Sua sessão expirou", sem chamar a API |
| Token com assinatura inválida | a API devolve 401, a sessão cai e o login mostra "Sua sessão foi encerrada" |
| Token que vence com a página aberta | o app volta sozinho ao login no `exp` do JWT, mesmo sem nenhuma chamada à API |
| API fora do ar ao restaurar a sessão | tela "Não foi possível restaurar a sessão" com "Tentar novamente"; o token é preservado (falha de rede não é logout) |
| Sair | limpa o token e volta ao login; rota protegida volta a exigir login |
| Rota inexistente | página 404 dentro do shell |
| 375px | login e shell sem rolagem horizontal; Sidebar oculta, hambúrguer visível; o menu navega e fecha sozinho |
| Desktop (1366px) | Sidebar expandida e recolhida conforme o DS |
| `npm run build` e `docker compose up --build` | ok; o frontend sobe *healthy* |
| Regras de aderência do DS (`_adherence.oxlintrc.json`) | sem cor hex, sem `px`, sem `<button>` cru. Restam 2 avisos de `<input>`: ver "Pendências" |

## O que foi criado

- **`src/ds/`** (ponte com o bundle):
  - `react-global.js` faz `window.React = React`;
  - `index.js` importa `react-global.js` e depois `@ds/_ds_bundle.js`, e reexporta os componentes de `window.RiskOpsUI`. A ordem dos imports ESM garante que o React global exista antes de o bundle ser avaliado, e é a mesma instância do app.
  - `main.jsx` importa `ds/index.js` antes do `App`.
- **`src/api/client.js`:** `api(path, {method, json, form, query, signal})`.
  - Injeta o `Authorization: Bearer` do `localStorage`.
  - Converte o envelope de erro do backend em `ApiError` (`status`, `code`, `message`, `details`, `requestId`). Falha de rede vira `ApiError` com status 0 e mensagem em pt-BR.
  - Um 401 *com token enviado* avisa o contexto de autenticação. O 401 do próprio login é só credencial errada.
  - `query` aceita listas (`status=aberto&status=em_analise`), no formato que a API espera.
- **`src/auth/AuthContext.jsx`:** estados `checking`, `authenticated`, `anonymous` e `unavailable`.
  - Restaura a sessão com `/api/auth/me`.
  - Encerra a sessão em qualquer 401, num timer no `exp` do JWT e quando outra aba sai.
  - Guarda o motivo do encerramento para o login explicar o que aconteceu.
- **`src/auth/RequireAuth.jsx`:** spinner enquanto confere a sessão, tela de API indisponível ou redirecionamento ao login com o destino em `state.from`.
- **`src/layout/`:**
  - `Layout.jsx` monta `AppShell`, `Sidebar`, `Topbar` e `MobileNavigation`, com `onNavigate` ligado ao `navigate()` do React Router.
  - `navigation.js` tem os grupos do menu, o item ativo pela rota, os rótulos de papel e as iniciais do avatar.
- **`src/pages/`:** `Login.jsx` (composição do split de autenticação do DS), `Placeholder.jsx`, `NotFound.jsx` e `usePageTitle.js` (título da aba por tela).
- **Dependência nova:** `react-router` 7.18.

## O que mudou em relação ao plano

- **React Router 7, não o 8.** O 8.5 é o mais recente, mas o 7.18 é a linha estável que já conheço bem; a API declarativa usada aqui (`BrowserRouter`, `Routes`, `Navigate`) é a mesma.
- **Login composto, não `ScreenLogin`.** A tela pronta do DS não aceita props e traz o cartão de MFA. O login usa as mesmas classes (`auth-shell`, `auth-card`, `auth-form`) com `Field` e `Button`, e textos do produto.
- **Sidebar sem o grupo "Configurações"** (`accountItems=[]`): não há tela de configurações. O grupo "Conta" fica só com "Sair".
- **Ícones do menu limitados aos da Sidebar.** Ela aceita só `overview`, `analyses`, `kyc`, `risk`, `consultations` e `settings`. Resumo usa `overview`, Casos usa `analyses` e Entidades usa `kyc` (escudo).
- **O menu móvel é recriado a cada rota** (`key={pathname}`). O `<details>` do DS não fecha sozinho ao navegar.
- **Bundle do DS fora do Fast Refresh** (`react({ exclude: /_ds_bundle\.js$/ })`). É um IIFE pré-compilado, não precisa de transformação.
- **Além do previsto:** expiração pelo relógio, logout entre abas, tela de API indisponível, 404 no shell e título da aba por tela.

## Pendências menores

- **Avisos de `<input>` no login.** A regra de aderência do DS sugere `Checkbox`/`Radio` para qualquer `<input>`, mas o DS não tem campo de texto: o próprio `ScreenLogin` e o `Field` usam `<input>` cru dentro do `Field`. Mantido assim.
- **Credenciais demo não aparecem na tela de login.** Ficam no README (Etapa 7). Posso exibi-las no rodapé do login se preferir.
- **Token em `localStorage`.** Exposto a XSS, em troca de simplicidade e de funcionar sem CSRF. O trade-off entra no README, como previsto.
- **Teste de navegador fora do repo.** O roteiro Playwright usado acima rodou num diretório temporário; o plano não prevê testes de front no CI. Posso versioná-lo se quiser.
- O build continua com o aviso inofensivo do `@import` de fontes do `_ds_bundle.css` (ver Etapa 1).

## Próxima etapa

Etapa 6: telas de negócio. Resumo com `MetricGrid`, lista de casos com filtros e paginação na URL, detalhe com timeline, ações de status e notas, criar/editar caso, entidades, estados de loading/erro/vazio.

## Como validar

Rode os comandos na raiz do repo.

### 1. Subir
```bash
docker compose up --build -d && docker compose ps     # 3 serviços (healthy)
```

### 2. Login e sessão (http://localhost:5173)
1. Abra http://localhost:5173/casos?status=aberto. Você é levado para `/login`.
2. Entre com `analista@nsights.demo` e a senha `errada`: aparece "Email ou senha inválidos.".
3. Entre com `analista@nsights.demo` / `riskops123`: você volta para `/casos?status=aberto`, e o Topbar mostra "Analista · Rafael Lima".
4. Recarregue (F5): continua logado.
5. Clique no botão de recolher a barra lateral, ao lado dela: a Sidebar vira um trilho de ícones. Recarregue: continua recolhida.
6. Clique em "Entidades" e em "Novo caso": a URL muda sem recarregar a página.
7. Clique em "Sair": volta ao login.
8. Entre como `admin@nsights.demo` / `riskops123`: o Topbar mostra "Administrador".

### 3. Token expirado e token inválido
Com a sessão aberta, no console do navegador (F12):
```js
localStorage.setItem('riskops.token', 'e30.eyJleHAiOjEwMDB9.x'); location.reload()
// volta ao login com "Sua sessão expirou. Entre novamente para continuar."
localStorage.setItem('riskops.token', 'e30.eyJleHAiOjQxMDI0NDQ4MDB9.x'); location.reload()
// a API recusa (401) e o login mostra "Sua sessão foi encerrada. ..."
```

### 4. Console e React
Com o DevTools aberto na aba Console, refaça o passo 2. Não deve aparecer nenhum erro de React ("Invalid hook call", "more than one copy of React"). Os únicos erros esperados são os 401 de rede da senha errada e do passo 3.

### 5. Mobile (375px)
No DevTools, ative o modo dispositivo (Ctrl+Shift+M) com largura 375:
- o login vira uma coluna, sem rolagem horizontal;
- depois de entrar, a Sidebar some e aparece o botão de menu no Topbar;
- o menu abre, navega e fecha sozinho ao trocar de tela.

### 6. API fora do ar
```bash
docker compose stop backend
```
Com a sessão aberta, recarregue a página: aparece "Não foi possível restaurar a sessão", com "Tentar novamente".
```bash
docker compose start backend
```
Espere o backend ficar *healthy* e clique em "Tentar novamente": a tela volta, sem pedir login.

### 7. Build local
```bash
cd frontend && npm ci && npm run build && cd ..   # termina com "built in ..."
```

### 8. Revisar o código
```bash
git show --stat <hash>
```
Os arquivos principais são:
- `frontend/src/ds/index.js`
- `frontend/src/api/client.js`
- `frontend/src/auth/AuthContext.jsx`
- `frontend/src/layout/Layout.jsx`
- `frontend/src/pages/Login.jsx`
