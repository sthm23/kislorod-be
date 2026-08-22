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

4. Run migrations before start:
- npm run prisma:migrate:deploy

Optional one-command start with migrations:
- npm run start:prod:migrate

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

5. Run database migrations:
- npm run prisma:migrate:deploy

6. Start backend:
- npm run start:prod

## 3) No direct DB access from local machine

If your local machine cannot reach DB, do migrations in the same network where app runs:

1. Preferred:
- run npm run prisma:migrate:deploy on hosting (or CI runner connected to DB).

2. Fallback when hosting cannot run CLI and only SQL panel is available:
- create migrations in project source control,
- open each migration.sql from prisma/migrations,
- execute SQL manually in DB panel in order.

Important:
- do not use prisma migrate dev in production.
- use prisma migrate deploy in production.
