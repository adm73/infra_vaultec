# Vaultec production deployment

The production stack pulls the published multi-architecture image from GitHub
Container Registry and runs Vaultec with PostgreSQL and Redis. It binds the
application to `127.0.0.1:3001` so an HTTPS reverse proxy can expose
`https://vaultec.ai`.

## 1. Publish the image

Push `main` or a tag such as `v1.0.0`. The **Build and publish container**
workflow publishes:

- `ghcr.io/adm73/infra_vaultec:latest`
- `ghcr.io/adm73/infra_vaultec:v1.0.0` for a version tag
- `ghcr.io/adm73/infra_vaultec:sha-<commit>`

If the repository or package is private, log in on the server with a GitHub
token that has `read:packages`:

```bash
echo "$GHCR_TOKEN" | docker login ghcr.io -u adm73 --password-stdin
```

## 2. Prepare the server

Install Docker Engine with the Compose plugin, then create a deployment
directory:

```bash
sudo install -d -m 0750 /opt/vaultec
sudo chown "$USER":"$USER" /opt/vaultec
cd /opt/vaultec

curl -fsSLO https://raw.githubusercontent.com/adm73/infra_vaultec/main/docker-compose.prod.yml
curl -fsSL https://raw.githubusercontent.com/adm73/infra_vaultec/main/.env.production.example -o .env
chmod 600 .env
```

Generate four different secrets and put them in `.env`:

```bash
openssl rand -base64 36
```

Set `PUBLIC_URL=https://vaultec.ai`. Do not commit or upload the server `.env`.

## 3. Start or update

```bash
docker compose --env-file .env -f docker-compose.prod.yml pull
docker compose --env-file .env -f docker-compose.prod.yml up -d
docker compose --env-file .env -f docker-compose.prod.yml ps
curl -fsS http://127.0.0.1:3001/api/status
```

To deploy an immutable release, set
`VAULTEC_IMAGE=ghcr.io/adm73/infra_vaultec:v1.0.0` in `.env`.

## 4. Reverse proxy

Forward `https://vaultec.ai` to `http://127.0.0.1:3001`. Preserve the original
`Host`, `X-Forwarded-For`, and `X-Forwarded-Proto` headers, and disable response
buffering for streaming API routes.

## 5. Backup

Back up the database before every upgrade:

```bash
docker compose --env-file .env -f docker-compose.prod.yml exec -T postgres \
  pg_dump -U root -d vaultec --format=custom > "vaultec-$(date +%F).dump"
```

The persistent volumes are `vaultec_postgres_data`, `vaultec_vaultec_data`,
and `vaultec_vaultec_logs`.
