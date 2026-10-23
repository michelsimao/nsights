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

  // .design-sync/previews/Field.tsx
  var Field_exports = {};
  __export(Field_exports, {
    Formulario: () => Formulario,
    Validacao: () => Validacao
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

  // .design-sync/previews/Field.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Formulario = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gap: "1rem", width: "24rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Field, { hint: "CPF ou CNPJ, com ou sem pontuação.", htmlFor: "doc", label: "Documento da entidade", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { defaultValue: "12.345.678/0001-90", id: "doc" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Field, { htmlFor: "policy", label: "Política de risco", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { defaultValue: "v4", id: "policy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "v4", children: "Crédito PJ — v4 (vigente)" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "v3", children: "Crédito PJ — v3" })
      ] }) })
    ] });
  };
  var Validacao = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gap: "1.25rem", width: "24rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Field, { error: "CNPJ inválido: o dígito verificador não confere. Revise o número informado.", feedbackId: "cnpj-feedback", htmlFor: "cnpj", label: "CNPJ da contraparte", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { "aria-describedby": "cnpj-feedback", "aria-invalid": true, defaultValue: "12.345.678/0001-99", id: "cnpj" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Field, { feedbackId: "cpf-feedback", htmlFor: "cpf", label: "CPF do representante", validHint: "CPF válido — pronto para a busca no cadastro.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { "aria-describedby": "cpf-feedback", defaultValue: "529.982.247-25", id: "cpf" }) })
    ] });
  };
  return __toCommonJS(Field_exports);
})();
