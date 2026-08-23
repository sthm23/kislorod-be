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
var TelegramAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const init_data_node_1 = require("@tma.js/init-data-node");
let TelegramAuthGuard = TelegramAuthGuard_1 = class TelegramAuthGuard {
    configService;
    logger = new common_1.Logger(TelegramAuthGuard_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const initData = this.extractInitData(request);
        if (!initData) {
            this.logger.warn('No initData found in request');
            throw new common_1.UnauthorizedException('Telegram authentication required');
        }
        try {
            const botToken = this.configService.get('TELEGRAM_BOT_TOKEN');
            if (!botToken) {
                this.logger.error('TELEGRAM_BOT_TOKEN is not configured');
                throw new common_1.UnauthorizedException('Server configuration error');
            }
            (0, init_data_node_1.validate)(initData, botToken, {
                expiresIn: 3600,
            });
            const parsed = (0, init_data_node_1.parse)(initData);
            request.telegramUser = parsed.user;
            request.telegramInitData = parsed;
            this.logger.log(`Authenticated user: ${parsed.user?.id}`);
            return true;
        }
        catch (error) {
            this.logger.error('Telegram auth validation failed', error);
            throw new common_1.UnauthorizedException('Invalid Telegram authentication data');
        }
    }
    extractInitData(request) {
        const authHeader = request.headers['authorization'];
        if (authHeader?.startsWith('tma ')) {
            return authHeader.substring(4);
        }
        const initDataHeader = request.headers['x-telegram-init-data'];
        if (initDataHeader) {
            return initDataHeader;
        }
        if (request.body?.initData) {
            return request.body.initData;
        }
        if (request.query?.initData) {
            return request.query.initData;
        }
        return null;
    }
};
exports.TelegramAuthGuard = TelegramAuthGuard;
exports.TelegramAuthGuard = TelegramAuthGuard = TelegramAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TelegramAuthGuard);
//# sourceMappingURL=telegram-auth.guard.js.map