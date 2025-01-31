FROM denoland/deno:latest AS builder

WORKDIR /app
COPY . .

RUN deno install
RUN deno run build

FROM ubuntu:latest AS production

RUN apt-get -y update && apt-get -y install nginx

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]