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

  // .design-sync/previews/KpiCard.tsx
  var KpiCard_exports = {};
  __export(KpiCard_exports, {
    FaixaExecutiva: () => FaixaExecutiva,
    SemMovimento: () => SemMovimento
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

  // .design-sync/previews/KpiCard.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var FaixaExecutiva = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "46rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.MetricGrid, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.KpiCard,
        {
          delta: "+18%",
          hint: "Período anterior: 1.089",
          label: "Análises iniciadas",
          spark: [64, 71, 68, 80, 92, 88, 104],
          tone: "accent",
          value: "1.284"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.KpiCard,
        {
          delta: "+2%",
          hint: "1.207 concluídas no período",
          label: "Taxa de conclusão",
          spark: [89, 91, 90, 92, 93, 94, 94],
          value: "94%"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.KpiCard,
        {
          delta: "+12%",
          hint: "Fonte indisponível na coleta",
          invert: true,
          label: "Com lacunas",
          spark: [4, 6, 5, 8, 9, 11, 12],
          tone: "warning",
          value: "96"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.KpiCard,
        {
          delta: "-3",
          hint: "Eram 10 no período anterior",
          invert: true,
          label: "Vetos emitidos",
          spark: [12, 10, 11, 9, 10, 8, 7],
          tone: "danger",
          value: "7"
        }
      )
    ] }) });
  };
  var SemMovimento = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { border: "1px solid var(--border)", borderRadius: ".55rem", overflow: "hidden", width: "14rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.KpiCard, { delta: "+0%", hint: "Mesmo patamar do período anterior", label: "Reprocessamentos", spark: [40, 42, 41, 41, 40, 41, 41], value: "41" }) });
  };
  return __toCommonJS(KpiCard_exports);
})();
