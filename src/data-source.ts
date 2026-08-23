import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Order } from './orders/entities/order.entity';
import { User } from './users/entities/user.entity';
import { Report } from './reports/entities/report.entity';
import { InitSchema1724515200000 } from './migrations/1724515200000-InitSchema';

const dbSsl = process.env.DB_SSL === 'true';

export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Order, User, Report],
    migrations: [InitSchema1724515200000],
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
    ssl: dbSsl ? { rejectUnauthorized: false } : false,
});
