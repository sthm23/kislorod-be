import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { UsersService } from '../users/users.service';
export declare class TelegramService implements OnModuleInit {
    private readonly configService;
    private readonly usersService;
    private bot;
    private readonly logger;
    constructor(configService: ConfigService, usersService: UsersService);
    onModuleInit(): Promise<void>;
    private setupHandlers;
    getBot(): Telegraf;
    onModuleDestroy(): Promise<void>;
}
