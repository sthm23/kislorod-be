import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class TelegramAuthGuard implements CanActivate {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractInitData;
}
