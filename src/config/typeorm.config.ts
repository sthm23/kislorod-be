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
  const dbHost = configService.get<string>('DB_HOST');
  const dbPort = Number(configService.get<string>('DB_PORT', '5432'));
  const dbUser = configService.get<string>('PG_USER');
  const dbPassword = configService.get<string>('PG_PASSWORD');
  const dbName = configService.get<string>('PG_DB');
  const databaseUrl = configService.get<string>('DATABASE_URL');

  const hasDiscreteCredentials =
    Boolean(dbHost) &&
    Boolean(dbUser) &&
    dbPassword !== undefined &&
    Boolean(dbName);

  let sslConfig: boolean | { rejectUnauthorized: boolean } = false;

  if (dbSsl === 'true') {
    sslConfig = { rejectUnauthorized: false };
  }

  return {
    type: 'postgres',
    ...(hasDiscreteCredentials
      ? {
        host: dbHost,
        port: dbPort,
        username: dbUser,
        password: dbPassword,
        database: dbName,
      }
      : {
        url: databaseUrl,
      }),
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
