# Dockerfile from Astro docs

# alpine is fine
# node:22.1.0-bookworm, node:20.13.1-slim, node:20.13.1-alpine
ARG NODE_IMAGE=22.alpine

FROM ${NODE_IMAGE} AS base
WORKDIR /app

# for alpine
RUN apk add --no-cache git

FROM base AS build
COPY package.json ./
RUN npm install

COPY . .

ARG ARG_SITE_URL
ENV SITE_URL=$ARG_SITE_URL
RUN echo "SITE_URL=$SITE_URL"


RUN npm run build

FROM nginx:stable-alpine3.17-slim AS runtime
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# sufficient for SSG
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
