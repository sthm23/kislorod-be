import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Order } from './orders/entities/order.entity';
import { User } from './users/entities/user.entity';
import { Report } from './reports/entities/report.entity';
import { InitSchema1724515200000 } from './migrations/1724515200000-InitSchema';

const dbSsl = process.env.DB_SSL === 'true';
const hasDiscreteCredentials =
    Boolean(process.env.DB_HOST) &&
    Boolean(process.env.PG_USER) &&
    process.env.PG_PASSWORD !== undefined &&
    Boolean(process.env.PG_DB);

export default new DataSource({
    type: 'postgres',
    ...(hasDiscreteCredentials
        ? {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || '5432'),
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
        }
        : {
            url: process.env.DATABASE_URL,
        }),
    entities: [Order, User, Report],
    migrations: [InitSchema1724515200000],
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
    ssl: dbSsl ? { rejectUnauthorized: false } : false,
});
