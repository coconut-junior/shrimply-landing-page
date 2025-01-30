FROM denoland/deno:latest AS builder

WORKDIR /app
COPY . .

CMD ["deno", "install"]
CMD ["deno", "run", "build"]

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]