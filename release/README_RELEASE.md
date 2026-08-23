# Release Bundle

This directory is generated automatically for deployment.

## Deploy steps on hosting

1. Upload all files from this folder.
2. Install production dependencies: npm ci --omit=dev
3. Set environment variables on hosting panel (DATABASE_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_MINI_APP_URL, PORT).
4. Start service: npm run start:prod

Migrations are applied automatically on application startup.

Optional manual migration run:
npm run migration:run:prod
