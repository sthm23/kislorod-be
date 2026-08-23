"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./orders/entities/order.entity");
const user_entity_1 = require("./users/entities/user.entity");
const report_entity_1 = require("./reports/entities/report.entity");
const isProduction = process.env.NODE_ENV === 'production';
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [order_entity_1.Order, user_entity_1.User, report_entity_1.Report],
    migrations: ['src/migrations/*.ts', 'dist/migrations/*.js'],
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
    logging: !isProduction,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});
//# sourceMappingURL=data-source.js.map