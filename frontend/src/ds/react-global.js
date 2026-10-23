// O _ds_bundle.js lê `window.React` no instante em que é avaliado (shim do esbuild).
// Este módulo é importado ANTES do bundle em ds/index.js: a ordem de avaliação dos
// imports ESM garante que o global exista, e é a mesma instância que o app usa.
import React from 'react';

window.React = React;
