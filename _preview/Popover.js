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

  // .design-sync/previews/Popover.tsx
  var Popover_exports = {};
  __export(Popover_exports, {
    AlinhadoADireita: () => AlinhadoADireita,
    CoberturaDaConsulta: () => CoberturaDaConsulta
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

  // .design-sync/previews/Popover.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var CoberturaDaConsulta = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { minHeight: "21rem", width: "22rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      ds_exports.Popover,
      {
        footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Button, { variant: "secondary", children: "Gerenciar fontes" }),
        onOpenChange: () => {
        },
        open: true,
        title: "Cobertura da consulta",
        trigger: "Fontes da consulta",
        triggerDetail: "12 ativas · atualizada há 2 h",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { color: "var(--muted)", lineHeight: 1.5, margin: 0 }, children: "Consulta de 26/08/2026 sobre AGRO FORTE PARTICIPAÇÕES LTDA (CNPJ 12.345.678/0001-90)." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { style: { display: "grid", gap: ".3rem", listStyle: "none", margin: 0, padding: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Receita Federal (CNPJ)" }),
              " — atualizada"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CNDT — Justiça do Trabalho" }),
              " — atualizada"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Processos judiciais" }),
              " — parcial: TJBA fora do ar"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Mídia negativa" }),
              " — pendente de créditos"
            ] })
          ] })
        ]
      }
    ) });
  };
  var AlinhadoADireita = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", justifyContent: "flex-end", minHeight: "13rem", width: "26rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "14rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_exports.Popover,
      {
        align: "end",
        onOpenChange: () => {
        },
        open: true,
        title: "Critério do alerta",
        trigger: "Alerta de sócio em comum",
        triggerDetail: "Regra QSA-07",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { color: "var(--muted)", lineHeight: 1.5, margin: 0 }, children: "Dispara quando dois fornecedores da carteira compartilham sócio com participação acima de 25% nos últimos 5 anos." })
      }
    ) }) });
  };
  return __toCommonJS(Popover_exports);
})();
