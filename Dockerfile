FROM denoland/deno:latest

WORKDIR /app
COPY . .

RUN deno install
RUN deno run build

CMD ["deno", "run", "serve"]