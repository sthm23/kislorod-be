# TypeORM Migration Guide

## Миграция завершена ✅

Проект успешно мигрирован с Prisma на TypeORM.

## Структура проекта

### Entities (Сущности)
- `src/orders/entities/order.entity.ts` - Order entity
- `src/users/entities/user.entity.ts` - User entity  
- `src/reports/entities/report.entity.ts` - Report entity

### Конфигурация
- `src/config/typeorm.config.ts` - TypeORM конфигурация для NestJS
- `src/data-source.ts` - DataSource для CLI команд миграций

## Доступные команды

### Запуск приложения
```bash
npm run start:dev        # Development mode
npm run start:prod       # Production mode
npm run build            # Build проект
```

### Работа с миграциями

**Создание новой миграции:**
```bash
npm run migration:create src/migrations/MigrationName
```

**Генерация миграции из изменений entities:**
```bash
npm run migration:generate src/migrations/MigrationName
```

**Применение миграций:**
```bash
npm run migration:run
```

**Откат последней миграции:**
```bash
npm run migration:revert
```

## Основные отличия от Prisma

### 1. Репозитории вместо PrismaClient

**Prisma:**
```typescript
constructor(private prisma: PrismaService) {}

await this.prisma.order.findMany()
```

**TypeORM:**
```typescript
constructor(
  @InjectRepository(Order)
  private orderRepository: Repository<Order>,
) {}

await this.orderRepository.find()
```

### 2. Работа с relations

**Prisma:**
```typescript
await this.prisma.order.findMany({
  include: { user: true }
})
```

**TypeORM:**
```typescript
await this.orderRepository.find({
  relations: { user: true }
})
```

### 3. Create и Save

**TypeORM:**
```typescript
const order = this.orderRepository.create(createOrderDto);
await this.orderRepository.save(order);
```

### 4. Update

**TypeORM:**
```typescript
await this.orderRepository.update(id, updateData);
```

### 5. Delete

**TypeORM:**
```typescript
const entity = await this.repository.findOne({ where: { id } });
await this.repository.remove(entity);
```

## Важные замечания

1. **synchronize: false** - всегда используйте миграции в production
2. **Nullable поля** - используйте `| null` в TypeScript типах для nullable колонок
3. **Relations** - используйте декораторы `@ManyToOne`, `@OneToMany`, `@JoinColumn`
4. **Enum** - экспортируйте enum из entity файла для использования в DTO

## Подключение к БД

Убедитесь, что в `.env` файле указан `DATABASE_URL`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## Полезные ссылки

- [TypeORM Documentation](https://typeorm.io/)
- [NestJS TypeORM Integration](https://docs.nestjs.com/techniques/database)
- [TypeORM Migrations](https://typeorm.io/migrations)
