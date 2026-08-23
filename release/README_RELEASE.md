# Release Bundle

This directory is generated automatically for deployment.

## ВАЖНО: Все зависимости уже включены в dist/main.js

НЕ запускайте `npm install` на хостинге! Это вызовет ошибку TAR_ENTRY_ERROR из-за лимита inodes.
Webpack собрал все зависимости (TypeORM, pg, NestJS и др.) в один файл dist/main.js.

## Deploy steps on aHOST

1. Загрузите все файлы из этой папки через FTP/File Manager
2. В cPanel установите переменные окружения:
   - NODE_ENV=production
   - DATABASE_URL=postgresql://user:password@localhost:5432/db
     ⚠ ВАЖНО: используйте localhost (НЕ внешний IP хостинга!)
     ⚠ Если пароль содержит спецсимволы (&$;=*@#), используйте URL-encoding:
     & → %26, $ → %24, ; → %3B, = → %3D, * → %2A
     Инструмент: https://www.urlencoder.org/
   - DB_SSL=false (важно! aHOST не поддерживает SSL для PostgreSQL)
   - TELEGRAM_BOT_TOKEN=ваш_токен
   - TELEGRAM_MINI_APP_URL=ваш_url
   - PORT=3000 (или другой)
3. В настройках Node.js приложения укажите:
   - Application URL: ваш домен
   - Application startup file: dist/main.js
   - Node.js version: 18.x или выше
4. НЕ устанавливайте зависимости! Просто запустите приложение.

## Размер bundle

dist/main.js содержит весь код приложения и все зависимости.
Размер файла: ~3-5 MB.
Количество файлов: 3 (package.json, dist/main.js, .env.example).

## Миграции

Миграции применяются автоматически при старте приложения.

## Решение проблем

### "The server does not support SSL connections"
Убедитесь, что переменная окружения DB_SSL=false.

### "uuid-ossp.control: No such file or directory"
Расширение uuid-ossp недоступно на shared hosting.
Проект использует gen_random_uuid() (встроенная функция PostgreSQL 13+).
Пересоберите проект: npm run build && npm run release:prepare

### "connect ECONNREFUSED"
В DATABASE_URL используйте localhost, а не внешний IP хостинга.
Правильно: postgresql://user:pass@localhost:5432/db

### "password authentication failed"
Специальные символы в пароле должны быть URL-encoded в DATABASE_URL.
Например, пароль "a&b$c" должен быть "a%26b%24c".
Инструмент: https://www.urlencoder.org/

### "TAR_ENTRY_ERROR / Disk quota exceeded"
Не запускайте npm install! Все зависимости уже в dist/main.js.
