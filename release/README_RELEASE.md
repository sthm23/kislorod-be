# Release Bundle

This directory is generated automatically for deployment.

## Deploy steps on hosting

1. Upload all files from this folder.
2. Install production dependencies: npm ci --omit=dev
3. Set environment variables on hosting panel (DATABASE_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_MINI_APP_URL, PORT).
4. Apply migrations: npm run prisma:migrate:deploy
5. Start service: npm run start:prod

Or run both steps 4+5 with:
npm run start:prod:migrate
