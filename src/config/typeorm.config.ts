import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Report } from '../reports/entities/report.entity';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [Order, User, Report],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  migrationsTransactionMode: 'each',
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  logging: configService.get<string>('NODE_ENV') === 'development',
  ssl:
    configService.get<string>('NODE_ENV') === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
