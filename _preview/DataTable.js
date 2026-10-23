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

  // .design-sync/previews/DataTable.tsx
  var DataTable_exports = {};
  __export(DataTable_exports, {
    ProcessosGranulares: () => ProcessosGranulares,
    SelecaoEmLote: () => SelecaoEmLote
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

  // .design-sync/previews/DataTable.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var processos = [
    { id: "p1", numero: "1023456-78.2023.8.26.0100", entidade: "Agropecuária Santa Fé Ltda.", assunto: "Execução fiscal", polo: "Passivo", valor: 231e4 },
    { id: "p2", numero: "0800123-45.2021.8.19.0001", entidade: "Transportadora Vale Verde S.A.", assunto: "Rescisão contratual", polo: "Passivo", valor: 84e4 },
    { id: "p3", numero: "5001234-56.2022.4.03.6100", entidade: "Agropecuária Santa Fé Ltda.", assunto: "Crédito rural", polo: "Ativo", valor: 412500 },
    { id: "p4", numero: "0712345-67.2020.8.07.0001", entidade: "Mineração Serra Alta Ltda.", assunto: "Dano ambiental", polo: "Passivo", valor: 120400 },
    { id: "p5", numero: "1004567-89.2024.8.26.0224", entidade: "Transportadora Vale Verde S.A.", assunto: "Cobrança de frete", polo: "Ativo", valor: 96300 },
    { id: "p6", numero: "0034567-12.2019.5.02.0038", entidade: "Mineração Serra Alta Ltda.", assunto: "Verbas rescisórias", polo: "Passivo" },
    { id: "p7", numero: "8000123-90.2023.8.05.0001", entidade: "Agropecuária Santa Fé Ltda.", assunto: "Indenização por atraso", polo: "Passivo", valor: 58200 }
  ];
  var moeda = (valor) => valor == null ? "Não informado" : valor.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });
  var colunasProcessos = [
    { key: "numero", label: "Processo", sortable: true, render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mono", children: p.numero }), value: (p) => p.numero },
    { key: "entidade", label: "Entidade", sortable: true },
    { key: "assunto", label: "Assunto" },
    { key: "polo", label: "Polo" },
    { key: "valor", label: "Valor", sortable: true, align: "right", value: (p) => p.valor ?? null, render: (p) => p.valor == null ? "Não informado" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mono", children: moeda(p.valor) }) },
    { key: "acao", label: "", render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.TableLink, { children: "Abrir" }), value: () => null }
  ];
  var ProcessosGranulares = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "58rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_exports.DataTable,
      {
        columns: colunasProcessos,
        filters: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Situação" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { defaultValue: "in_progress", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "all", children: "Todas" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "in_progress", children: "Em tramitação" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "closed", children: "Encerrados" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Polo" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { defaultValue: "all", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "all", children: "Todos" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "passive", children: "Passivo" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "active", children: "Ativo" })
            ] })
          ] })
        ] }),
        pageSize: 5,
        rows: processos,
        searchAriaLabel: "Buscar por número, entidade ou assunto",
        searchPlaceholder: "Número, entidade ou assunto",
        sort: { dir: "desc", key: "valor" }
      }
    ) });
  };
  var entidades = [
    { id: "e1", nome: "Agropecuária Santa Fé Ltda.", cnpj: "12.345.678/0001-90", consultas: "6/6 concluídas", situacao: "ativa", rotulo: "Concluída" },
    { id: "e2", nome: "Transportadora Vale Verde S.A.", cnpj: "98.765.432/0001-10", consultas: "4/6 concluídas", situacao: "alerta", rotulo: "Em execução" },
    { id: "e3", nome: "Mineração Serra Alta Ltda.", cnpj: "45.678.912/0001-33", consultas: "6/6 concluídas", situacao: "alerta", rotulo: "Com alerta" },
    { id: "e4", nome: "Construtora Horizonte Azul Ltda.", cnpj: "23.456.789/0001-55", consultas: "0/6 concluídas", situacao: "inativa", rotulo: "Não iniciada" }
  ];
  var colunasEntidades = [
    { key: "nome", label: "Entidade", sortable: true },
    { key: "cnpj", label: "CNPJ", render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mono", children: e.cnpj }), value: (e) => e.cnpj },
    { key: "consultas", label: "Consultas" },
    { key: "situacao", label: "Situação", render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.StatusPill, { status: e.situacao, children: e.rotulo }), value: (e) => e.rotulo }
  ];
  var SelecaoEmLote = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "46rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_exports.DataTable,
      {
        columns: colunasEntidades,
        pageSize: 5,
        rows: entidades,
        searchAriaLabel: "Buscar por nome ou CNPJ",
        searchPlaceholder: "Nome ou CNPJ",
        selected: ["e2", "e3"],
        selectionLabel: (e) => `Selecionar ${e.nome}`
      }
    ) });
  };
  return __toCommonJS(DataTable_exports);
})();
