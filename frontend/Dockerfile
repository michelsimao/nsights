# Contexto de build = raiz do repo (o DS fica fora de frontend/). Ver .dockerignore na raiz.
FROM node:24-alpine AS build
WORKDIR /repo/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Só os arquivos do DS que o app carrega.
COPY styles.css _ds_bundle.css _ds_bundle.js /repo/
COPY tokens /repo/tokens
COPY frontend/ ./
RUN npm run build

FROM nginx:1.27-alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/frontend/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
