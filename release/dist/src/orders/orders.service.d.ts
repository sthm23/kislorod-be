import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from '../users/users.service';
export declare class OrdersService {
    private readonly prisma;
    private readonly usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    create(createOrderDto: CreateOrderDto, telegramId?: string): Promise<{
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
    findByUserId(userId: string): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
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
    findByTelegramId(telegramId: string): Promise<({
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
