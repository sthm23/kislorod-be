# Инструкции по настройке и запуску

## Что было реализовано

### 1. Установленные пакеты
- `telegraf` - библиотека для работы с Telegram Bot API
- `@tma.js/init-data-node` - валидация данных Telegram Mini App
- `@nestjs/config` - управление переменными окружения

### 2. Структура проекта

```
src/
├── common/
│   ├── decorators/
│   │   └── telegram-user.decorator.ts    # Декораторы для извлечения данных пользователя
│   └── guards/
│       └── telegram-auth.guard.ts        # Guard для валидации Telegram Mini App
├── orders/
│   ├── dto/
│   │   ├── create-order.dto.ts
│   │   └── update-order.dto.ts
│   ├── entities/
│   ├── orders.controller.ts              # CRUD API для заказов (защищен TelegramAuthGuard)
│   ├── orders.service.ts                 # Логика работы с заказами
│   └── orders.module.ts
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   ├── users.controller.ts               # CRUD API для пользователей
│   ├── users.service.ts                  # Логика работы с пользователями
│   └── users.module.ts
├── telegram/
│   ├── telegram.service.ts               # Telegram Bot для регистрации пользователей
│   └── telegram.module.ts
├── prisma/
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.module.ts
└── main.ts                               # CORS и ValidationPipe настроены
```

### 3. База данных (Prisma Schema)

Обновленная схема с отношениями:

```prisma
model Order {
  id          String      @id @default(uuid())
  productName String
  startDate   DateTime
  endDate     DateTime?
  pricePerDay Float
  phoneNumber String
  location    String
  status      OrderStatus
  createdAt   DateTime    @default(now())
  updatedAt   DateTime?
  userId      String?
  user        User?       @relation(fields: [userId], references: [id])
}

model User {
  id             String   @id @default(uuid())
  name           String?
  telegramId     String   @unique
  telegramUserId String?
  phone          String
  username       String?
  createdAt      DateTime @default(now())
  orders         Order[]
}
```

## Настройка перед запуском

### 1. Обновите .env файл

Убедитесь что в файле [.env](.env) указаны правильные значения:

```env
# Токен вашего Telegram бота (получить у @BotFather)
TELEGRAM_BOT_TOKEN=8643626629:AAFIz5M2Zs_tvM9B-m5HXpx0DK2hYus4068

# URL вашего Telegram Mini App
TELEGRAM_MINI_APP_URL=https://t.me/your_bot_name/app_name

# Порт приложения
PORT=4000

# База данных PostgreSQL
DATABASE_URL=postgresql://kislorod_tukhtamishev:&dIn$4_AO1HY;n=*@37.153.159.11:5432/kislorod_rental_db?schema=public
```

**ВАЖНО:** Обновите `TELEGRAM_MINI_APP_URL` на реальный URL вашего Mini App!

### 2. Примените миграцию базы данных

```bash
npx prisma migrate dev --name add-user-order-relation
```

Если возникнут проблемы с доступом к БД, можно использовать:

```bash
npx prisma db push
```

### 3. Запустите приложение

```bash
# Режим разработки
npm run start:dev

# Продакшн
npm run build
npm run start:prod
```

## API Endpoints

### Orders API (требует Telegram Auth)

Все endpoints защищены `TelegramAuthGuard` и требуют передачи `initData` из Telegram Mini App.

#### Заголовки запросов

```
Authorization: tma <initData>
# или
X-Telegram-Init-Data: <initData>
```

#### Endpoints

- `POST /orders` - Создать заказ (userId автоматически берется из Telegram)
- `GET /orders` - Получить все заказы
- `GET /orders/my` - Получить заказы текущего пользователя
- `GET /orders/:id` - Получить заказ по ID
- `PATCH /orders/:id` - Обновить заказ
- `DELETE /orders/:id` - Удалить заказ

#### Пример создания заказа

```typescript
const response = await fetch('http://localhost:4000/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `tma ${window.Telegram.WebApp.initData}`
  },
  body: JSON.stringify({
    productName: "Кислородный баллон 10L",
    startDate: "2024-01-15T10:00:00Z",
    endDate: "2024-01-20T10:00:00Z",
    pricePerDay: 500,
    phoneNumber: "+998901234567",
    location: "Ташкент, Мирзо-Улугбекский район",
    status: "ACTIVE"
  })
});
```

### Users API

- `POST /users` - Создать пользователя
- `GET /users` - Получить всех пользователей
- `GET /users/:id` - Получить пользователя по ID
- `GET /users/telegram/:telegramId` - Получить пользователя по Telegram ID
- `PATCH /users/:id` - Обновить пользователя
- `DELETE /users/:id` - Удалить пользователя

## Telegram Bot

Бот автоматически запускается при старте приложения.

### Команды бота

- `/start` - Начать работу, запросить номер телефона
- `/help` - Показать справку
- `/app` - Открыть Mini App

### Поток регистрации

1. Пользователь отправляет `/start`
2. Бот запрашивает номер телефона через кнопку "Поделиться номером"
3. Пользователь делится номером
4. Бот сохраняет данные в БД
5. Бот предлагает открыть Mini App через кнопку

## Интеграция с Frontend (Telegram Mini App)

### 1. Инициализация

```typescript
import { WebApp } from '@twa-dev/sdk';

WebApp.ready();
const initData = WebApp.initData;
```

### 2. Создание заказа

```typescript
async function createOrder(orderData) {
  const response = await fetch('http://localhost:4000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `tma ${WebApp.initData}`
    },
    body: JSON.stringify(orderData)
  });
  
  return response.json();
}
```

### 3. Получение заказов пользователя

```typescript
async function getMyOrders() {
  const response = await fetch('http://localhost:4000/orders/my', {
    headers: {
      'Authorization': `tma ${WebApp.initData}`
    }
  });
  
  return response.json();
}
```

## Безопасность

- ✅ Все Orders API endpoints защищены `TelegramAuthGuard`
- ✅ Валидация `initData` с использованием токена бота
- ✅ CORS настроен для работы с Telegram Mini App
- ✅ Глобальная валидация входящих данных (ValidationPipe)
- ✅ Автоматическая привязка заказов к пользователям через Telegram ID

## Следующие шаги

1. **Обновите TELEGRAM_MINI_APP_URL в .env** - укажите реальный URL вашего Mini App
2. **Примените миграции БД** - `npx prisma migrate dev`
3. **Запустите приложение** - `npm run start:dev`
4. **Протестируйте бота** - отправьте `/start` вашему боту в Telegram
5. **Подключите фронтенд** - используйте примеры выше для интеграции

## Troubleshooting

### Ошибка доступа к БД при миграции

Если `prisma migrate dev` не работает, используйте:
```bash
npx prisma db push
npx prisma generate
```

### Бот не запускается

Проверьте что `TELEGRAM_BOT_TOKEN` правильно указан в [.env](.env)

### 401 Unauthorized при запросах

Убедитесь что:
1. Передаете `initData` в заголовке `Authorization: tma <initData>`
2. Токен бота в .env совпадает с токеном бота, который выдал initData
3. initData не истек (по умолчанию валиден 1 час)

## Контакты

Если возникнут вопросы - обращайтесь!
