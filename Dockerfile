FROM denoland/deno:latest

WORKDIR /app
COPY . .

EXPOSE 8000
CMD ["deno", "install"]
CMD ["deno", "run", "dev"]
