import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Order } from './orders/entities/order.entity';
import { User } from './users/entities/user.entity';
import { Report } from './reports/entities/report.entity';

const isProduction = process.env.NODE_ENV === 'production';

export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Order, User, Report],
    migrations: ['src/migrations/*.ts', 'dist/migrations/*.js'],
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
    logging: !isProduction,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});
