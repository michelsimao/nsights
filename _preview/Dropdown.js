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
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx2)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/Dropdown.tsx
  var Dropdown_exports = {};
  __export(Dropdown_exports, {
    AcoesDoDossie: () => AcoesDoDossie,
    Fechado: () => Fechado
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

  // .design-sync/previews/Dropdown.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var IconOpen = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 3H3v10h10v-3M9 3h4v4M13 3 7.5 8.5" }) });
  var IconPdf = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 2v8m0 0L5 7m3 3 3-3M3 13h10" }) });
  var IconRefresh = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 8a5 5 0 1 1-1.5-3.6M13 2v3h-3" }) });
  var IconTrash = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", fill: "none", height: "16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.6", viewBox: "0 0 16 16", width: "16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 4.5h10M6.5 4.5V3h3v1.5m-5 0V13h7V4.5M6.8 7v3.5m2.4-3.5v3.5" }) });
  var AcoesDoDossie = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { minHeight: "19rem", width: "24rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_exports.Dropdown,
      {
        ariaLabel: "Ações do dossiê",
        items: [
          { id: "sec-dossie", label: "Dossiê", type: "label" },
          { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconOpen, {}), id: "abrir", label: "Abrir resultado completo" },
          { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPdf, {}), id: "exportar", label: "Exportar dossiê (PDF)", shortcut: "⌘E" },
          { id: "sep-1", type: "sep" },
          { id: "sec-verificacao", label: "Verificação", type: "label" },
          { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRefresh, {}), id: "reprocessar", label: "Reprocessar com fontes atuais" },
          { disabled: true, id: "agendar", label: "Agendar reprocessamento" },
          { id: "sep-2", type: "sep" },
          { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrash, {}), id: "excluir", label: "Excluir da carteira", tone: "danger" }
        ],
        open: true,
        trigger: "Ações"
      }
    ) });
  };
  var Fechado = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "24rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_exports.Dropdown,
      {
        ariaLabel: "Ações do dossiê",
        items: [
          { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconOpen, {}), id: "abrir", label: "Abrir resultado completo" },
          { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPdf, {}), id: "exportar", label: "Exportar dossiê (PDF)", shortcut: "⌘E" }
        ],
        open: false,
        trigger: "Ações"
      }
    ) });
  };
  return __toCommonJS(Dropdown_exports);
})();
