ScreenLogin from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ScreenLogin` (bundle loaded from the root `_ds_bundle.js`).

Tela de login — o split de autenticação do app, inteiro.

À esquerda, o painel de marca escuro (`.auth-brand-panel`): wordmark "n-sights"
em texto (sem imagem — o app usa um PNG, aqui o glifo é tipográfico),
qualificador "Risk intelligence", o mote em duas linhas e a linha de confiança
("Ambiente protegido · Trilha auditável"). À direita, o painel de acesso claro
(`.auth-access-panel`) com dois cartões `.auth-card` empilhados:

1. o cartão de login como em `/login?error=credentials` — kicker, título,
   banner de erro `.auth-form-error` ("Email ou senha inválidos.") e o
   formulário Field de email + senha com o rodapé "Esqueci minha senha";
2. a vinheta do desafio MFA de `/mfa` — código do autenticador (TOTP) ou de
   recuperação, com o botão "Verificar".

As linhas do mote são renderizadas sem as classes `.auth-typewriter-*`: a
animação de máquina de escrever nasce com a coluna colapsada e esconderia o
texto numa captura estática.

## Examples

### Tela

```jsx
() => (
  <div>
    <style>{'.skip-link{display:none}'}</style>
    <ScreenLogin />
  </div>
)
```
