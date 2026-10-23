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

  // .design-sync/previews/ResultRow.tsx
  var ResultRow_exports = {};
  __export(ResultRow_exports, {
    ComDetalhe: () => ComDetalhe,
    Lista: () => Lista
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

  // .design-sync/previews/ResultRow.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  function DocIcon() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 2h5l3 3v9H4z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 2v3h3" })
    ] });
  }
  function ScaleIcon() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 16 16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 2v12M4 5h8M3 5l-1.5 4h3zM13 5l1.5 4h-3z" }) });
  }
  function GlobeIcon() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "8", cy: "8", r: "6" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 8h12M8 2c1.8 2 1.8 10 0 12M8 2c-1.8 2-1.8 10 0 12" })
    ] });
  }
  var Lista = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "34rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.ResultRows, { label: "Verificações", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.ResultRow,
        {
          badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Badge, { tone: "ok", children: "Verificado" }),
          facts: ["CNPJ 12.345.678/0001-90", "Receita Federal", "há 2 dias"],
          icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocIcon, {}),
          title: "Situação cadastral"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.ResultRow,
        {
          action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.TableLink, { children: "Abrir" }),
          badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Badge, { tone: "attention", children: "3 em andamento" }),
          facts: ["TJSP, TJRJ", "R$ 1,2 mi em discussão"],
          icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleIcon, {}),
          title: "Processos judiciais"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.ResultRow,
        {
          badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Badge, { tone: "gap", children: "Fonte indisponível" }),
          facts: ["tentado 3×", "última às 14h02"],
          icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeIcon, {}),
          title: "Mídia adversa"
        }
      )
    ] }) });
  };
  var ComDetalhe = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "34rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ResultRows, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      ds_exports.ResultRow,
      {
        badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Badge, { tone: "critical", children: "Consta" }),
        facts: ["OFAC SDN", "correspondência por nome e data de nascimento"],
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeIcon, {}),
        onOpen: () => {
        },
        open: true,
        title: "Listas restritivas",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Correspondência parcial no nome do sócio administrador. A data de nascimento confere; o documento não foi divulgado pela fonte, então a identificação não é definitiva." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confirmação exige documento oficial do sócio — a análise não conclui sozinha." })
        ]
      }
    ) }) });
  };
  return __toCommonJS(ResultRow_exports);
})();
