import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, telegramUserId: number): Promise<{
        user: {
            id: string;
            createdAt: Date;
            name: string | null;
            telegramId: string;
            telegramUserId: string | null;
            phone: string;
            username: string | null;
        } | null;
    } & {
        id: string;
        productName: string;
        startDate: Date;
        endDate: Date | null;
        pricePerDay: number;
        phoneNumber: string;
        location: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userId: string | null;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        user: {
            id: string;
            createdAt: Date;
            name: string | null;
            telegramId: string;
            telegramUserId: string | null;
            phone: string;
            username: string | null;
        } | null;
    } & {
        id: string;
        productName: string;
        startDate: Date;
        endDate: Date | null;
        pricePerDay: number;
        phoneNumber: string;
        location: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userId: string | null;
    })[]>;
    findMyOrders(telegramUserId: number): Promise<({
        user: {
            id: string;
            createdAt: Date;
            name: string | null;
            telegramId: string;
            telegramUserId: string | null;
            phone: string;
            username: string | null;
        } | null;
    } & {
        id: string;
        productName: string;
        startDate: Date;
        endDate: Date | null;
        pricePerDay: number;
        phoneNumber: string;
        location: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userId: string | null;
    })[]>;
    findOne(id: string): import("../../generated/prisma/models").Prisma__OrderClient<({
        user: {
            id: string;
            createdAt: Date;
            name: string | null;
            telegramId: string;
            telegramUserId: string | null;
            phone: string;
            username: string | null;
        } | null;
    } & {
        id: string;
        productName: string;
        startDate: Date;
        endDate: Date | null;
        pricePerDay: number;
        phoneNumber: string;
        location: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userId: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): import("../../generated/prisma/models").Prisma__OrderClient<{
        user: {
            id: string;
            createdAt: Date;
            name: string | null;
            telegramId: string;
            telegramUserId: string | null;
            phone: string;
            username: string | null;
        } | null;
    } & {
        id: string;
        productName: string;
        startDate: Date;
        endDate: Date | null;
        pricePerDay: number;
        phoneNumber: string;
        location: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    remove(id: string): import("../../generated/prisma/models").Prisma__OrderClient<{
        id: string;
        productName: string;
        startDate: Date;
        endDate: Date | null;
        pricePerDay: number;
        phoneNumber: string;
        location: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
