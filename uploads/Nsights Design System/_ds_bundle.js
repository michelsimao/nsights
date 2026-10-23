/* @ds-bundle: {"format":4,"namespace":"NsightsDesignSystem_f2e488","components":[{"name":"Badge","sourcePath":"components/badges/Badge.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"}],"sourceHashes":{"components/badges/Badge.jsx":"f6cbc14ea7e3","components/buttons/Button.jsx":"71ae48603b3b","components/cards/Card.jsx":"b21263b32242","components/forms/Input.jsx":"fd42ff5e8ef1","components/icons/Icon.jsx":"9fd8fe7b4535","ui_kits/nsights/ReportView.jsx":"1a7c5e69d440","ui_kits/nsights/Sidebar.jsx":"ec338189ef39"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NsightsDesignSystem_f2e488 = window.NsightsDesignSystem_f2e488 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/badges/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Nsights badge. Variants: default | primary | success | warning | danger | premium | critical. */
function Badge({
  variant = 'default',
  className = '',
  children,
  ...rest
}) {
  const cls = ['ns-badge', `ns-badge-${variant}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/Badge.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Nsights button. Variants: primary | secondary | ghost | gold. Sizes: md (default) | sm. */
function Button({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['ns-btn', `ns-btn-${variant}`, size === 'sm' ? 'ns-btn-sm' : '', iconOnly ? 'ns-btn-iconly' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Nsights unified card — hairline top gradient, accent hover glow. */
function Card({
  padding = 20,
  className = '',
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ns-unified-card', className].filter(Boolean).join(' '),
    style: {
      padding,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Nsights text input. */
function Input({
  label,
  className = '',
  ...rest
}) {
  const input = /*#__PURE__*/React.createElement("input", _extends({
    className: ['ns-input', className].filter(Boolean).join(' ')
  }, rest));
  if (!label) return input;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ns-label",
    style: {
      display: 'block',
      marginBottom: 6
    }
  }, label), input);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LUCIDE_SRC = 'https://unpkg.com/lucide@0.462.0/dist/umd/lucide.min.js';
let lucideLoading = null;
function ensureLucide() {
  if (window.lucide && window.lucide.icons) return Promise.resolve(window.lucide);
  if (!lucideLoading) {
    lucideLoading = new Promise(resolve => {
      let s = document.querySelector('script[data-ns-lucide]');
      if (!s) {
        s = document.createElement('script');
        s.src = LUCIDE_SRC;
        s.setAttribute('data-ns-lucide', '');
        document.head.appendChild(s);
      }
      s.addEventListener('load', () => resolve(window.lucide));
      s.addEventListener('error', () => resolve(null));
    });
  }
  return lucideLoading;
}
function pascal(name) {
  return String(name).split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

/** Nsights icon — Lucide glyph at hairline 1.75px stroke, colored via currentColor. */
function Icon({
  name,
  size = 16,
  strokeWidth = 1.75,
  style,
  ...rest
}) {
  const [, force] = React.useReducer(x => x + 1, 0);
  const ready = window.lucide && window.lucide.icons;
  React.useEffect(() => {
    if (!ready) ensureLucide().then(() => force());
  }, [ready]);
  const node = ready ? window.lucide.icons[pascal(name)] : null;
  if (!node) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-block',
        width: size,
        height: size,
        ...style
      }
    }, rest));
  }
  const kids = Array.isArray(node[0]) ? node : node[2] || [];
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      ...style
    },
    "aria-hidden": "true"
  }, rest), kids.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nsights/ReportView.jsx
try { (() => {
// Nsights report view — cover + TOC rail + relatorio-prose article.
function ReportView({
  activeTheme
}) {
  const ns = window.NsightsDesignSystem_f2e488 || {};
  const Badge = ns.Badge || (({
    variant,
    children
  }) => /*#__PURE__*/React.createElement("span", {
    className: 'ns-badge ns-badge-' + (variant || 'default')
  }, children));
  const Icon = ns.Icon || (() => null);
  const label = (window.NS_REPORT_THEMES.find(([id]) => id === activeTheme) || [])[1] || 'Relatório';
  return /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 40,
      padding: '40px 48px',
      boxSizing: 'border-box',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      maxWidth: 780
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ns-cover-kicker",
    style: {
      paddingTop: 6
    }
  }, "Relat\xF3rio de dilig\xEAncia"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "ns-btn ns-btn-secondary ns-btn-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 13,
    strokeWidth: 1.6
  }), " Exportar PDF"), /*#__PURE__*/React.createElement("button", {
    className: "ns-btn ns-btn-secondary ns-btn-sm ns-btn-iconly",
    "aria-label": "Compartilhar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share-2",
    size: 13,
    strokeWidth: 1.6
  })))), /*#__PURE__*/React.createElement("h1", {
    className: "ns-cover-title",
    style: {
      margin: '10px 0 8px'
    }
  }, "Meridiano Participa\xE7\xF5es S.A."), /*#__PURE__*/React.createElement("p", {
    className: "ns-cover-lead",
    style: {
      margin: 0
    }
  }, "Verifica\xE7\xE3o cadastral, societ\xE1ria e reputacional consolidada a partir de quatorze fontes."), /*#__PURE__*/React.createElement("dl", {
    className: "ns-cover-meta",
    style: {
      display: 'flex',
      gap: 32,
      margin: '20px 0 0',
      paddingBottom: 18,
      borderBottom: '1px solid var(--ns-border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Data-base"), /*#__PURE__*/React.createElement("dd", null, "4 jul 2026")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Escopo"), /*#__PURE__*/React.createElement("dd", null, "Pessoa jur\xEDdica")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Fontes"), /*#__PURE__*/React.createElement("dd", null, "14 consultadas")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Status"), /*#__PURE__*/React.createElement("dd", null, /*#__PURE__*/React.createElement(Badge, {
    variant: "success"
  }, "Conclu\xEDdo")))), /*#__PURE__*/React.createElement("article", {
    className: "relatorio-prose"
  }, /*#__PURE__*/React.createElement("h1", null, label), /*#__PURE__*/React.createElement("p", {
    className: "has-dropcap"
  }, "A verifica\xE7\xE3o abrangeu os cadastros p\xFAblicos e bases restritivas aplic\xE1veis ao escopo contratado, com data-base de 4 de julho de 2026. N\xE3o foram identificadas ocorr\xEAncias impeditivas na cadeia societ\xE1ria direta da entidade analisada.", /*#__PURE__*/React.createElement("sup", {
    className: "cite"
  }, "1")), /*#__PURE__*/React.createElement("blockquote", null, "N\xE3o foram identificados v\xEDnculos com pessoas expostas politicamente na cadeia societ\xE1ria direta."), /*#__PURE__*/React.createElement("h3", null, "S\xEDntese das consultas"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Cadastro"), /*#__PURE__*/React.createElement("th", null, "\xD3rg\xE3o"), /*#__PURE__*/React.createElement("th", null, "Resultado"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "CEIS"), /*#__PURE__*/React.createElement("td", null, "CGU"), /*#__PURE__*/React.createElement("td", null, "Nada consta")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "CNEP"), /*#__PURE__*/React.createElement("td", null, "CGU"), /*#__PURE__*/React.createElement("td", null, "Nada consta")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "OFAC SDN"), /*#__PURE__*/React.createElement("td", null, "Tesouro dos EUA"), /*#__PURE__*/React.createElement("td", null, "Nada consta")))), /*#__PURE__*/React.createElement("p", null, "A holding controladora det\xE9m participa\xE7\xE3o em duas outras sociedades ativas, ambas no mesmo setor de atua\xE7\xE3o, sem sobreposi\xE7\xE3o de quadros diretivos.", /*#__PURE__*/React.createElement("sup", {
    className: "cite"
  }, "2")))), /*#__PURE__*/React.createElement("nav", {
    className: "ns-toc",
    style: {
      flexShrink: 0,
      position: 'sticky',
      top: 40,
      alignSelf: 'flex-start',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ns-toc-label",
    style: {
      marginBottom: 10
    }
  }, "Sum\xE1rio"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "lvl-1 active"
  }, label), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "lvl-2"
  }, "S\xEDntese das consultas"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "lvl-3"
  }, "Bases restritivas"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "lvl-1"
  }, "Conclus\xE3o")));
}
window.NsReportView = ReportView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nsights/ReportView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nsights/Sidebar.jsx
try { (() => {
// Nsights app sidebar — report themes navigation.
const REPORT_THEMES = [['identidade', 'Identidade & cadastro', 'fingerprint'], ['societario', 'Estrutura societária', 'building-2'], ['sancoes_compliance', 'Sanções & Compliance', 'shield-check'], ['judicial', 'Processos judiciais', 'scale'], ['credito_financeiro', 'Crédito & situação financeira', 'banknote'], ['patrimonio', 'Patrimônio & bens', 'landmark'], ['propriedade_intelectual', 'Marcas e patentes', 'copyright'], ['trabalhista', 'Funcionários & vínculos', 'users'], ['falencias', 'Falências e recuperação', 'trending-down'], ['certidoes', 'Certidões negativas', 'file-check'], ['regulatorio', 'Atuação regulatória/setorial', 'gavel'], ['midia_politico', 'Mídia & exposição política', 'newspaper'], ['presenca_digital', 'Presença digital', 'globe'], ['pesquisa_aberta', 'Pesquisa aprofundada', 'search']];
function Sidebar({
  active,
  onSelect,
  dark,
  onToggleTheme
}) {
  const ns = window.NsightsDesignSystem_f2e488 || {};
  const Icon = ns.Icon || (() => null);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flexShrink: 0,
      background: 'var(--ns-bg-sidebar)',
      borderRight: '1px solid var(--ns-border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 18px 14px',
      borderBottom: '1px solid var(--ns-border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: dark ? (window.__resources || {}).logoDark || '../../assets/logo_dark.png' : (window.__resources || {}).logoLight || '../../assets/logo_light.png',
    alt: "Nsights",
    style: {
      height: 22,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '12px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ns-label-caps",
    style: {
      padding: '0 8px 8px'
    }
  }, "Fontes do relat\xF3rio"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, REPORT_THEMES.map(([id, label, icon]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => onSelect(id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      textAlign: 'left',
      fontFamily: 'var(--ns-font-sans)',
      fontSize: 12.5,
      fontWeight: active === id ? 600 : 400,
      color: active === id ? 'var(--ns-accent-primary)' : 'var(--ns-text-secondary)',
      background: active === id ? 'var(--ns-bg-active)' : 'transparent',
      border: 'none',
      borderRadius: 6,
      padding: '7px 8px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14,
    strokeWidth: 1.6,
    style: {
      color: active === id ? 'var(--ns-accent-primary)' : 'var(--ns-text-muted)'
    }
  }), label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      borderTop: '1px solid var(--ns-border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "ns-btn ns-btn-secondary ns-btn-sm",
    style: {
      width: '100%'
    },
    onClick: onToggleTheme
  }, /*#__PURE__*/React.createElement(Icon, {
    name: dark ? 'sun' : 'moon',
    size: 13,
    strokeWidth: 1.6
  }), dark ? 'Tema claro' : 'Tema escuro')));
}
window.NsSidebar = Sidebar;
window.NS_REPORT_THEMES = REPORT_THEMES;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nsights/Sidebar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Icon = __ds_scope.Icon;

})();
