import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        telegramId: string;
        telegramUserId: string | null;
        phone: string;
        username: string | null;
    }>;
    findAll(): Promise<({
        orders: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string | null;
        telegramId: string;
        telegramUserId: string | null;
        phone: string;
        username: string | null;
    })[]>;
    findOne(id: string): Promise<{
        orders: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string | null;
        telegramId: string;
        telegramUserId: string | null;
        phone: string;
        username: string | null;
    }>;
    findByTelegramId(telegramId: string): Promise<({
        orders: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string | null;
        telegramId: string;
        telegramUserId: string | null;
        phone: string;
        username: string | null;
    }) | null>;
    findOrCreate(createUserDto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        telegramId: string;
        telegramUserId: string | null;
        phone: string;
        username: string | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        telegramId: string;
        telegramUserId: string | null;
        phone: string;
        username: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        telegramId: string;
        telegramUserId: string | null;
        phone: string;
        username: string | null;
    }>;
}
