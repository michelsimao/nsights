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

  // .design-sync/previews/Radio.tsx
  var Radio_exports = {};
  __export(Radio_exports, {
    AbrangenciaDaAnalise: () => AbrangenciaDaAnalise,
    PrioridadeDaFila: () => PrioridadeDaFila
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

  // .design-sync/previews/Radio.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var entityIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 24 24", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 21h16M5 21V4h9v17M17 9h2v12" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 8h3M8 12h3M8 16h3" })
  ] });
  var partnersIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 24 24", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "9", cy: "8", r: "2.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4.5 18c.5-3 2.1-4.5 4.5-4.5s4 1.5 4.5 4.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "17", cy: "9", r: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.5 18c.4-2.4 1.2-3.6 2.8-3.6 1.1 0 1.9.6 2.4 1.8" })
  ] });
  var groupIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 24 24", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "5", r: "2.2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "5", cy: "18", r: "2.2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "19", cy: "18", r: "2.2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 7.2v3.6M11 12l-4.5 3.6M13 12l4.5 3.6" })
  ] });
  var AbrangenciaDaAnalise = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "26rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.RadioGroup, { legend: "Abrangência da análise", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Radio, { description: "1 crédito — CNPJ 12.345.678/0001-90 apenas", icon: entityIcon, label: "Somente a entidade", name: "abrangencia", value: "entidade" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Radio, { checked: true, description: "3 créditos — inclui sócios com participação direta", icon: partnersIcon, label: "Entidade e sócios diretos", name: "abrangencia", value: "socios" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Radio, { description: "6 créditos — sócios e empresas coligadas", icon: groupIcon, label: "Sócios e grupo econômico", name: "abrangencia", value: "grupo" })
    ] }) });
  };
  var PrioridadeDaFila = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "22rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.RadioGroup, { legend: "Prioridade de processamento", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Radio, { checked: true, description: "Resultado em até 2 horas úteis", label: "Normal", name: "prioridade", value: "normal" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Radio, { description: "Fura a fila da organização", label: "Urgente", name: "prioridade", value: "urgente" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Radio, { description: "Disponível no plano Enterprise", disabled: true, label: "Tempo real", name: "prioridade", value: "tempo-real" })
    ] }) });
  };
  return __toCommonJS(Radio_exports);
})();
