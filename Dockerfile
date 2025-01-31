FROM denoland/deno:latest AS builder

WORKDIR /app
COPY . .

RUN deno install
RUN deno run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add cloudflared installation
RUN apk add --no-cache cloudflared

# Create a non-root user for cloudflared
RUN adduser -D cloudflared

USER cloudflared

CMD curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && 

sudo dpkg -i cloudflared.deb && 

sudo cloudflared service install eyJhIjoiYTRkOWJlMmFhMTZkMDZjODVjYzdiZGM4ZDgwYmRhZmQiLCJ0IjoiZmMyODAzMmUtZWQ0OC00ZjA0LThkOWYtZThlMzM3Nzg3Y2QyIiwicyI6Ill6bGlZemhtTVdRdE5UVXdPQzAwTW1OaExUbGhOVFl0TmpFNFlUUTFZekprTkdKbSJ9

# Start both nginx and cloudflared
CMD nginx -g 'daemon off;' & cloudflared tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
