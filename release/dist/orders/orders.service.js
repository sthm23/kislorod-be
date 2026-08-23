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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const users_service_1 = require("../users/users.service");
let OrdersService = class OrdersService {
    orderRepository;
    usersService;
    constructor(orderRepository, usersService) {
        this.orderRepository = orderRepository;
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
        const order = this.orderRepository.create({
            ...createOrderDto,
            userId,
            startDate: new Date(createOrderDto.startDate),
            endDate: createOrderDto.endDate ? new Date(createOrderDto.endDate) : null,
        });
        return this.orderRepository.save(order);
    }
    findAll() {
        return this.orderRepository.find({
            relations: {
                user: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findOne(id) {
        return this.orderRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
        });
    }
    findByUserId(userId) {
        return this.orderRepository.find({
            where: { userId },
            relations: {
                user: true,
            },
            order: {
                createdAt: 'DESC',
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
    async update(id, updateOrderDto) {
        const updateData = {
            ...updateOrderDto,
        };
        if (updateOrderDto.startDate) {
            updateData.startDate = new Date(updateOrderDto.startDate);
        }
        if (updateOrderDto.endDate) {
            updateData.endDate = new Date(updateOrderDto.endDate);
        }
        await this.orderRepository.update(id, updateData);
        return this.orderRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
        });
    }
    async remove(id) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return this.orderRepository.remove(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map