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

  // .design-sync/previews/CommandPalette.tsx
  var CommandPalette_exports = {};
  __export(CommandPalette_exports, {
    Paleta: () => Paleta
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

  // .design-sync/previews/CommandPalette.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var IconFolder = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 4.5h4l1.5 2H14V13H2z" }) });
  var IconSearch = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "7", cy: "7", r: "4.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m10.5 10.5 3.5 3.5" })
  ] });
  var IconCoin = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "8", cy: "8", r: "5.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 5.5v5M6.5 7h3" })
  ] });
  var IconPlus = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3v10M3 8h10" }) });
  var IconRefresh = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 8a5 5 0 1 1-1.5-3.6M13 2v3h-3" }) });
  var IconDatabase = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "8", cy: "4", rx: "5", ry: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4" })
  ] });
  var Paleta = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "var(--surface)", height: "38rem", overflow: "hidden", position: "relative", transform: "translateZ(0)", width: "55rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_exports.CommandPalette,
      {
        items: [
          { group: "Ir para", icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFolder, {}), id: "carteira", label: "Carteira de análises" },
          { group: "Ir para", icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSearch, {}), id: "consultas", label: "Consultas em andamento" },
          { group: "Ir para", icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCoin, {}), id: "creditos", label: "Créditos e consumo" },
          { group: "Ir para", icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconDatabase, {}), id: "fontes", label: "Fontes de dados" },
          { group: "Ações", icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {}), id: "nova-analise", label: "Nova análise de entidade", shortcut: "⌘N" },
          { group: "Ações", icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRefresh, {}), id: "reprocessar", label: "Reprocessar verificação atual" }
        ],
        onClose: () => {
        },
        open: true
      }
    ) });
  };
  return __toCommonJS(CommandPalette_exports);
})();
