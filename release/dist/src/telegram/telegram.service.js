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
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const telegraf_1 = require("telegraf");
const users_service_1 = require("../users/users.service");
let TelegramService = TelegramService_1 = class TelegramService {
    configService;
    usersService;
    bot;
    logger = new common_1.Logger(TelegramService_1.name);
    constructor(configService, usersService) {
        this.configService = configService;
        this.usersService = usersService;
        const token = this.configService.get('TELEGRAM_BOT_TOKEN');
        if (!token) {
            throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
        }
        this.bot = new telegraf_1.Telegraf(token);
        this.setupHandlers();
    }
    async onModuleInit() {
        try {
            await this.bot.launch();
            this.logger.log('Telegram bot started successfully');
        }
        catch (error) {
            this.logger.error('Failed to start Telegram bot', error);
        }
    }
    setupHandlers() {
        this.bot.start(async (ctx) => {
            const user = ctx.from;
            await ctx.reply(`Привет, ${user.first_name}! 👋\n\nДобро пожаловать в сервис аренды кислородных баллонов.\n\nДля продолжения работы, пожалуйста, поделитесь своим номером телефона.`, telegraf_1.Markup.keyboard([
                telegraf_1.Markup.button.contactRequest('📱 Поделиться номером телефона'),
            ]).resize());
        });
        this.bot.on('contact', async (ctx) => {
            const contact = ctx.message.contact;
            const user = ctx.from;
            if (contact.user_id !== user.id) {
                await ctx.reply('❌ Пожалуйста, поделитесь своим собственным номером телефона.');
                return;
            }
            try {
                const createdUser = await this.usersService.findOrCreate({
                    telegramId: user.id.toString(),
                    telegramUserId: user.username,
                    phone: contact.phone_number,
                    name: `${user.first_name} ${user.last_name || ''}`.trim(),
                    username: user.username,
                });
                const miniAppUrl = this.configService.get('TELEGRAM_MINI_APP_URL') || 'https://t.me/kislorodpro_bot';
                await ctx.reply(`✅ Спасибо! Ваш номер телефона сохранен.\n\nТеперь вы можете пользоваться нашим приложением.`, telegraf_1.Markup.keyboard([
                    telegraf_1.Markup.button.webApp('🚀 Открыть приложение', miniAppUrl),
                ]).resize());
                this.logger.log(`User registered: ${createdUser.id} - ${createdUser.phone}`);
            }
            catch (error) {
                this.logger.error('Error saving user', error);
                await ctx.reply('❌ Произошла ошибка при сохранении данных. Попробуйте еще раз.');
            }
        });
        this.bot.command('help', async (ctx) => {
            await ctx.reply(`Доступные команды:\n\n` +
                `/start - Начать работу с ботом\n` +
                `/help - Показать это сообщение\n` +
                `/app - Открыть приложение`);
        });
        this.bot.command('app', async (ctx) => {
            const miniAppUrl = this.configService.get('TELEGRAM_MINI_APP_URL') || 'https://t.me/kislorodpro_bot';
            await ctx.reply('Откройте приложение для создания заказа:', telegraf_1.Markup.keyboard([
                telegraf_1.Markup.button.webApp('🚀 Открыть приложение', miniAppUrl),
            ]).resize());
        });
    }
    getBot() {
        return this.bot;
    }
    async onModuleDestroy() {
        await this.bot.stop();
        this.logger.log('Telegram bot stopped');
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map