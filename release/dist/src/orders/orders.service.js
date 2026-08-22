"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let OrdersService = class OrdersService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async create(createOrderDto, telegramId) {
        let userId = createOrderDto.userId;
        if (telegramId && !userId) {
            const user = await this.usersService.findByTelegramId(telegramId);
            if (user) {
                userId = user.id;
            }
        }
        return this.prisma.order.create({
            data: {
                ...createOrderDto,
                userId,
                startDate: new Date(createOrderDto.startDate),
                endDate: createOrderDto.endDate ? new Date(createOrderDto.endDate) : null,
            },
            include: {
                user: true,
            },
        });
    }
    findAll() {
        return this.prisma.order.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    findOne(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
    }
    findByUserId(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findByTelegramId(telegramId) {
        const user = await this.usersService.findByTelegramId(telegramId);
        if (!user) {
            return [];
        }
        return this.findByUserId(user.id);
    }
    update(id, updateOrderDto) {
        return this.prisma.order.update({
            where: { id },
            data: {
                ...updateOrderDto,
                startDate: updateOrderDto.startDate ? new Date(updateOrderDto.startDate) : undefined,
                endDate: updateOrderDto.endDate ? new Date(updateOrderDto.endDate) : undefined,
                updatedAt: new Date(),
            },
            include: {
                user: true,
            },
        });
    }
    remove(id) {
        return this.prisma.order.delete({
            where: { id }
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map