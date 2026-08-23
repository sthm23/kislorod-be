"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = void 0;
const order_entity_1 = require("../orders/entities/order.entity");
const user_entity_1 = require("../users/entities/user.entity");
const report_entity_1 = require("../reports/entities/report.entity");
const getTypeOrmConfig = (configService) => ({
    type: 'postgres',
    url: configService.get('DATABASE_URL'),
    entities: [order_entity_1.Order, user_entity_1.User, report_entity_1.Report],
    migrations: ['dist/migrations/*.js'],
    migrationsRun: true,
    migrationsTransactionMode: 'each',
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
    logging: configService.get('NODE_ENV') === 'development',
    ssl: configService.get('NODE_ENV') === 'production'
        ? { rejectUnauthorized: false }
        : false,
});
exports.getTypeOrmConfig = getTypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map