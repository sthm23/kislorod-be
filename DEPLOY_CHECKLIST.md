# Чеклист деплоя на aHOST

## ✅ Проблемы решены:
1. ~~TAR_ENTRY_ERROR (лимит inodes)~~ → Webpack собирает всё в один файл
2. ~~SSL connection error~~ → Добавлена переменная DB_SSL=false

---

## 📦 Шаг 1: Подготовка локально

```bash
npm run build              # Сборка проекта
npm run release:prepare    # Создание release bundle
```

В папке `release/` будет создан bundle размером ~3.65 MB.

---

## 🚀 Шаг 2: Загрузка на хостинг

### Через File Manager в cPanel:

1. Зайдите в **File Manager**
2. Перейдите в папку приложения (например `/home/kislorod/api.kislorodpro.uz/nodejs/`)
3. **УДАЛИТЕ** старую папку `node_modules` если она есть
4. **УДАЛИТЕ** старые файлы `dist/`, `package.json`, `package-lock.json`
5. Загрузите файлы из папки `release/`:
   - `package.json` (минимальный, без dependencies)
   - `dist/main.js` (3.65 MB - весь код + все зависимости)

---

## ⚙️ Шаг 3: Настройка в cPanel

### В разделе "Setup Node.js App":

**Application settings:**
- Application root: `/home/kislorod/api.kislorodpro.uz/nodejs`
- Application URL: `api.kislorodpro.uz` (ваш домен)
- Application startup file: `dist/main.js`
- Node.js version: `18.x` или выше

**Environment Variables (ОБЯЗАТЕЛЬНО добавить):**

```bash
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
DB_SSL=false
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_MINI_APP_URL=https://t.me/your_bot
PORT=3000
```

**⚠️ ВАЖНО:**
- **НЕ нажимайте кнопку "Run NPM Install"!**
- Все зависимости уже включены в `dist/main.js`
- npm install вызовет ошибку TAR_ENTRY_ERROR из-за лимита inodes

---

## ▶️ Шаг 4: Запуск

1. Нажмите кнопку **"Stop"** (если приложение запущено)
2. Нажмите кнопку **"Start"**
3. Проверьте логи:
   - Должно появиться: `Starting Nest application...`
   - Миграции применятся автоматически
   - Не должно быть ошибок про SSL

---

## 🔍 Проверка работы

Откройте в браузере: `https://api.kislorodpro.uz/`

Должен появиться ответ от сервера (или 404 если нет роута `/`).

---

## 🐛 Решение проблем

### Ошибка: "connect ECONNREFUSED" или "Connection refused"

**Причина:** В DATABASE_URL указан внешний IP вместо localhost.

**Симптомы:**
```
Error: connect ECONNREFUSED 37.153.159.4:5432
```

**Решение:**

На shared hosting (aHOST) PostgreSQL доступен только через `localhost` или `127.0.0.1`.

**Неправильно:**
```bash
DATABASE_URL=postgresql://user:pass@37.153.159.4:5432/db
DATABASE_URL=postgresql://user:pass@api.kislorodpro.uz:5432/db
```

**Правильно:**
```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/db
# или
DATABASE_URL=postgresql://user:pass@127.0.0.1:5432/db
```

Внешний IP используется **только для подключения К хостингу** (через SSH, FTP, браузер).
Для подключения **НА хостинге** (из приложения к базе) всегда используйте `localhost`.

---

### Ошибка: "password authentication failed"

**Причина:** Специальные символы в пароле не URL-encoded в DATABASE_URL.

**Симптомы:**
```
error: password authentication failed for user "kislorod_tukhtamishev"
code: '28P01'
```

**Решение:**

Если ваш пароль содержит специальные символы (`&`, `$`, `;`, `=`, `*`, `@`, `#`, `/`, `\`, пробелы), их нужно URL-encode:

| Символ | Код | Символ | Код |
|--------|-----|--------|-----|
| `&` | `%26` | `=` | `%3D` |
| `$` | `%24` | `*` | `%2A` |
| `;` | `%3B` | `@` | `%40` |
| `#` | `%23` | `/` | `%2F` |
| пробел | `%20` | `\` | `%5C` |

**Пример:**
- Пароль: `&dIn$4_AO1HY;n=*`
- Закодированный: `%26dIn%244_AO1HY%3Bn%3D%2A`
- DATABASE_URL: `postgresql://user:%26dIn%244_AO1HY%3Bn%3D%2A@host:5432/db`

**Онлайн инструмент:** https://www.urlencoder.org/

---

### Ошибка: "could not open extension control file uuid-ossp.control"

**Причина:** Расширение PostgreSQL `uuid-ossp` недоступно на shared hosting.

**Симптомы:**
```
Migration failed, error: could not open extension control file "/usr/share/pgsql/extension/uuid-ossp.control"
query: 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
```

**Решение:**

Эта проблема уже исправлена в текущей версии проекта. Миграции используют встроенную функцию PostgreSQL `gen_random_uuid()` вместо `uuid_generate_v4()` из расширения `uuid-ossp`.

Если у вас старая версия миграции:
1. Пересоберите проект локально (`npm run build && npm run release:prepare`)
2. Загрузите обновлённый `dist/main.js` на хостинг
3. Перезапустите приложение

`gen_random_uuid()` доступна в PostgreSQL 13+ без установки расширений.

---

### Ошибка: "The server does not support SSL connections"

**Причина:** Переменная `DB_SSL` не установлена или установлена в `true`.

**Решение:**
1. Зайдите в **Setup Node.js App**
2. Найдите раздел **Environment Variables**
3. Добавьте или измените: `DB_SSL=false`
4. Перезапустите приложение (Stop → Start)

---

### Ошибка: "TAR_ENTRY_ERROR" или "Disk quota exceeded"

**Причина:** Попытка установить `node_modules` (нажали "Run NPM Install").

**Решение:**
1. Удалите папку `node_modules` через File Manager
2. Убедитесь, что в папке только:
   - `package.json` (минимальный, без dependencies)
   - `dist/main.js` (один файл 3.65 MB)
3. **НЕ нажимайте** "Run NPM Install"
4. Просто запустите приложение кнопкой "Start"

---

## 📊 Статистика bundle

- **Размер:** 3.65 MB
- **Количество файлов на хостинге:** 2 (package.json + dist/main.js)
- **Количество inodes:** ~10 вместо ~15,000
- **Зависимости включены:** NestJS, TypeORM, pg, Telegraf и все остальные

---

## 📝 Дальнейшие обновления

При изменении кода:

1. Локально:
   ```bash
   npm run build
   npm run release:prepare
   ```

2. На хостинге:
   - Остановите приложение (Stop)
   - Замените только файл `dist/main.js`
   - Запустите приложение (Start)
