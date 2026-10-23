var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.RiskOpsUI;
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx2(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs2(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs2;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs2 : jsx2)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/AiThread.tsx
  var AiThread_exports = {};
  __export(AiThread_exports, {
    Conversa: () => Conversa,
    RespostaChegando: () => RespostaChegando
  });
  init_define_import_meta_env();

  // ds-shim:ds
  var ds_exports = {};
  __export(ds_exports, {
    default: () => ds_default
  });
  init_define_import_meta_env();
  __reExport(ds_exports, __toESM(require_ds_raw()));
  var g = window.RiskOpsUI;
  var ds_default = "default" in g ? g.default : g;

  // .design-sync/previews/AiThread.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var frame = { background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: ".75rem", display: "flex", flexDirection: "column", height: "26rem", overflow: "hidden", width: "42rem" };
  var Conversa = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: frame, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.AiThread, { label: "Consulta da Vale Verde Agroindústria", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AiTurn, { from: "user", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cadastro e processos do CNPJ 12.345.678/0001-90" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AiTurn, { from: "assistant", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.AiStream, { done: true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Vale Verde Agroindústria S.A." }),
          " está ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ativa" }),
          " na Receita Federal desde 14/03/2009, com sede em Rio Verde/GO e capital social de R$ 4,2 milhões."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Situação cadastral regular; CND federal vigente até 12/11/2026." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "7 processos judiciais localizados: 5 cíveis, 2 trabalhistas — nenhum com a empresa no polo passivo em execução fiscal." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Nenhuma ocorrência em listas restritivas (OFAC, ONU, CEIS, CNEP)." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Esta rodada consumiu 6 créditos. Quer que eu detalhe os processos trabalhistas?" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AiTurn, { from: "user", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Detalhar os trabalhistas e listar os sócios com participação acima de 10%." }) })
    ] }) });
  };
  var RespostaChegando = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: frame, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.AiThread, { label: "Consulta do lote de fornecedores", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AiTurn, { from: "user", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Analise este lote de 18 fornecedores: cadastro, processos e restrições." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AiTurn, { from: "assistant", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AiStream, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "Reconheci as 18 entidades do lote — 15 CNPJs e 3 CPFs. Já consultei o cadastro de 12 delas: 11 ativas e 1 ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "baixada" }),
        " (Transportadora Iguaçu Ltda., baixa em 02/2024). Agora estou cruzando processos judiciais…"
      ] }) }) })
    ] }) });
  };
  return __toCommonJS(AiThread_exports);
})();
