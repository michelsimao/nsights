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

  // .design-sync/previews/ChartShell.tsx
  var ChartShell_exports = {};
  __export(ChartShell_exports, {
    ComNotaDeLeitura: () => ComNotaDeLeitura,
    TendenciaDeAnalises: () => TendenciaDeAnalises
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

  // .design-sync/previews/ChartShell.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var TendenciaDeAnalises = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "34rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.ChartShell, { meta: "últimos 30 dias", title: "Volume de análises por dia", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ChartLegend, { items: ["Iniciadas", "Concluídas"] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ChartPlot, { axis: ["01 ago", "08 ago", "15 ago", "22 ago", "28 ago"], children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { "aria-label": "Análises iniciadas e concluídas por dia, pico de 24 iniciadas em 22 de agosto", preserveAspectRatio: "none", role: "img", viewBox: "0 0 720 184", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "advisory-area", x1: "0", x2: "0", y1: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "var(--accent)", stopOpacity: ".16" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "var(--accent)", stopOpacity: "0" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "advisory-chart-area", d: "M 0 126 L 102.9 107 L 205.7 75.3 L 308.6 94.3 L 411.4 50 L 514.3 12 L 617.1 56.3 L 720 31 L 720 164 L 0 164 Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "advisory-chart-started", d: "M 0 126 L 102.9 107 L 205.7 75.3 L 308.6 94.3 L 411.4 50 L 514.3 12 L 617.1 56.3 L 720 31" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "advisory-chart-completed", d: "M 0 138.7 L 102.9 119.7 L 205.7 100.7 L 308.6 107 L 411.4 81.7 L 514.3 43.7 L 617.1 69 L 720 50" })
      ] }) })
    ] }) });
  };
  var ComNotaDeLeitura = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "34rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_exports.ChartShell,
      {
        meta: "38 processos",
        note: "Colunas por ano de distribuição · processos sem data ficam fora do gráfico.",
        title: "Linha do tempo — ano de distribuição",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_exports.BarChart,
          {
            categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
            label: "Processos distribuídos por ano, de 3 em 2020 a 5 em 2025",
            series: [
              { label: "Cíveis", values: [2, 4, 3, 7, 6, 3] },
              { label: "Trabalhistas", values: [1, 2, 1, 4, 3, 2] }
            ]
          }
        )
      }
    ) });
  };
  return __toCommonJS(ChartShell_exports);
})();
