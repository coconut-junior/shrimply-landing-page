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
COPY --from=builder /app/dist/assets /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create startup script
RUN echo '#!/bin/bash\ncloudflared tunnel --no-autoupdate run --token $TUNNEL_TOKEN &\nnginx -g "daemon off;"' > /start.sh && \
    chmod +x /start.sh

CMD ["/start.sh"]
