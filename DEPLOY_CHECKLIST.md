# Deploy Checklist

## 1) Hosting setup checklist

Use this when your hosting can run build/start commands.

1. Set environment variables in hosting panel:
- DATABASE_URL
- TELEGRAM_BOT_TOKEN
- TELEGRAM_MINI_APP_URL
- PORT

2. Build command:
- npm ci
- npm run build

3. Start command:
- npm run start:prod

4. Run migrations before start (optional, manual):
- npm run migration:run:prod

Note:
- npm run start:prod already applies migrations automatically (migrationsRun: true)

## 2) Build-only upload checklist (release folder)

Use this when hosting asks to upload only build artifact.

1. Generate build locally:
- npm ci
- npm run build

2. Create release bundle locally:
- npm run release:prepare

3. Upload the full content of release folder.

4. On hosting install production dependencies:
- npm ci --omit=dev

5. Run database migrations (optional, manual):
- npm run migration:run:prod

6. Start backend:
- npm run start:prod

## 3) No direct DB access from local machine

If your local machine cannot reach DB, do migrations in the same network where app runs:

1. Preferred:
- run application startup on hosting (migrations are auto-applied).
- optional manual run before startup: npm run migration:run:prod.

2. Fallback when hosting cannot run CLI and only SQL panel is available:
- create SQL migration files from src/migrations and execute them manually in DB panel in order.

Important:
- do not use synchronize: true in production.
- use TypeORM migrations (auto on startup or manual migration:run:prod).
