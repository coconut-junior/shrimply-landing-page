FROM denoland/deno:latest AS builder

WORKDIR /app
COPY . .

RUN deno install
RUN deno run build

FROM ubuntu:latest AS production

# Install nginx and cloudflared
RUN apt-get update && apt-get install -y nginx curl && \
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && \
    dpkg -i cloudflared.deb && \
    rm cloudflared.deb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy built files and nginx configuration
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN "echo $TUNNEL_TOKEN"
RUN "echo ${TUNNEL_TOKEN}"

CMD ["cloudflared tunnel --no-autoupdate run --token $TUNNEL_TOKEN"]