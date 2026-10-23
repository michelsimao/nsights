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

  // .design-sync/previews/Checkbox.tsx
  var Checkbox_exports = {};
  __export(Checkbox_exports, {
    MarcacaoParcial: () => MarcacaoParcial,
    SelecaoDeConsultas: () => SelecaoDeConsultas
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

  // .design-sync/previews/Checkbox.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var ownershipIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 24 24", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "5", r: "2.2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "5", cy: "18", r: "2.2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "19", cy: "18", r: "2.2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 7.2v3.6M11 12l-4.5 3.6M13 12l4.5 3.6" })
  ] });
  var judicialIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 24 24", width: "16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3v18M5 8h14M7 8l-2.5 6a3 3 0 0 0 5 0L7 8zM17 8l-2.5 6a3 3 0 0 0 5 0L17 8z" }) });
  var complianceIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 24 24", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3 5 6v5c0 4 2.8 7.2 7 8.5 4.2-1.3 7-4.5 7-8.5V6l-7-3Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9.3 12 1.7 1.7 3.7-4" })
  ] });
  var mediaIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 24 24", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 5h13v14H6a2 2 0 0 1-2-2V5Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 8h3v9a2 2 0 0 1-2 2M7 8h7M7 11h7M7 14h4" })
  ] });
  var SelecaoDeConsultas = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", width: "26rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { alignItems: "center", display: "flex", justifyContent: "space-between", padding: "0 .6rem .3rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { style: { fontSize: ".75rem" }, children: "3 consultas selecionadas" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.SelectAllButton, { allSelected: false })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { checked: true, description: "CNPJ, sócios e participações na Receita Federal", icon: ownershipIcon, label: "Quadro societário e controle", name: "consultas", value: "qsa" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { checked: true, description: "Distribuições nos tribunais estaduais e federais", icon: judicialIcon, label: "Processos judiciais", name: "consultas", value: "judicial" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { checked: true, description: "OFAC, ONU, UE e PEP nacional", icon: complianceIcon, label: "Listas restritivas e sanções", name: "consultas", value: "listas" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { description: "Menções adversas em veículos de imprensa", icon: mediaIcon, label: "Mídia negativa", name: "consultas", value: "midia" })
    ] });
  };
  var MarcacaoParcial = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", width: "26rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { indeterminate: true, label: "Certidões", description: "2 de 4 certidões selecionadas", name: "certidoes", value: "todas" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { paddingLeft: "1.4rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { checked: true, label: "CND federal (Receita/PGFN)", name: "certidoes", value: "cnd" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { checked: true, label: "Certidão trabalhista (TST)", name: "certidoes", value: "tst" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { label: "Certidão estadual de tributos", name: "certidoes", value: "estadual" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Checkbox, { disabled: true, label: "FGTS — regularidade do empregador", name: "certidoes", value: "fgts" })
      ] })
    ] });
  };
  return __toCommonJS(Checkbox_exports);
})();
