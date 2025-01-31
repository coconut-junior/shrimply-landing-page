FROM denoland/deno:latest AS builder

WORKDIR /app
COPY . .

RUN deno install
RUN deno run build

FROM ubuntu:latest AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Download and install cloudflared
RUN wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O /usr/local/bin/cloudflared && \
    chmod +x /usr/local/bin/cloudflared

# Create a non-root user
RUN adduser -D cloudflared

USER cloudflared

# Start both nginx and cloudflared
CMD nginx -g 'daemon off;' & cloudflared tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
