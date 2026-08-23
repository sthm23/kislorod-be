import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Report } from '../reports/entities/report.entity';
import { InitSchema1724515200000 } from '../migrations/1724515200000-InitSchema';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const dbSsl = configService.get<string>('DB_SSL', 'false');

  let sslConfig: boolean | { rejectUnauthorized: boolean } = false;

  if (dbSsl === 'true') {
    sslConfig = { rejectUnauthorized: false };
  }

  return {
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'),
    entities: [Order, User, Report],
    migrations: [InitSchema1724515200000],
    migrationsRun: true,
    migrationsTransactionMode: 'each',
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
    logging: configService.get<string>('NODE_ENV') === 'development',
    ssl: sslConfig,
  };
};
