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

  // .design-sync/previews/Table.tsx
  var Table_exports = {};
  __export(Table_exports, {
    ExtratoDeCreditos: () => ExtratoDeCreditos,
    Processos: () => Processos,
    ProcessosSensiveis: () => ProcessosSensiveis
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

  // .design-sync/previews/Table.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Processos = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "42rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.TableScroll, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Processo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Tribunal" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Polo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Valor" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Situação" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "1023456-78.2023.8.26.0100" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "TJSP" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Passivo" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "R$ 840.000,00" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.StatusPill, { status: "alerta", children: "Em andamento" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.TableLink, { children: "Abrir" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "0800123-45.2021.8.19.0001" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "TJRJ" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Passivo" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "R$ 120.400,00" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.StatusPill, { status: "ativa", children: "Arquivado" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.TableLink, { children: "Abrir" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "5001234-56.2022.4.03.6100" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "TRF3" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Ativo" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "R$ 2.310.000,00" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.StatusPill, { status: "alerta", children: "Em andamento" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.TableLink, { children: "Abrir" }) })
        ] })
      ] })
    ] }) }) });
  };
  var ExtratoDeCreditos = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "46rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.TableScroll, { ariaLabel: "Histórico de lançamentos de crédito", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Table, { variant: "ledger", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Data" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Tipo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Referência" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Valor" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "12/08/2026 14:32" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Consumo" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Análise KYC — Agropecuária Santa Fé Ltda." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "−18" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "12/08/2026 09:05" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Reserva" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Lote — 4 entidades do grupo Vale Verde" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "−72" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "01/08/2026 08:00" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Concessão" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Recarga mensal do plano" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "+500" })
        ] })
      ] })
    ] }) }) });
  };
  var ProcessosSensiveis = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "52rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.TableScroll, { variant: "sensitive", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Table, { variant: "bare", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Processo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Entidade e vínculo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Assunto" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Polo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "amount-cell", children: "Valor" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "5001234-56.2022.4.03.6100" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Agropecuária Santa Fé Ltda." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "subject-cell", children: [
            "Fraude em licitação",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Ação Penal · Justiça Federal · TRF3/SP" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Passivo" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "amount-cell mono", children: "R$ 2.310.000,00" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "mono", children: "0712345-67.2020.8.07.0001" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Mineração Serra Alta Ltda." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "subject-cell", children: [
            "Dano ambiental",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Ação Civil Pública · Justiça Estadual · TJDFT" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Passivo" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "amount-cell mono", children: "R$ 120.400,00" })
        ] })
      ] })
    ] }) }) });
  };
  return __toCommonJS(Table_exports);
})();
