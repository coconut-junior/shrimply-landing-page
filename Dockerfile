FROM denoland/deno:latest AS builder

WORKDIR /app
COPY deno.json deno.lock ./
RUN deno cache --lock=deno.lock --lock-write deno.json

COPY . .
RUN deno task build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
