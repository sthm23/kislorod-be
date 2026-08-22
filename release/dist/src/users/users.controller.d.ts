import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
