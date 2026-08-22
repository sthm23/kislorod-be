import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validate, parse } from '@tma.js/init-data-node';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  private readonly logger = new Logger(TelegramAuthGuard.name);

  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const initData = this.extractInitData(request);

    if (!initData) {
      this.logger.warn('No initData found in request');
      throw new UnauthorizedException('Telegram authentication required');
    }

    try {
      const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

      if (!botToken) {
        this.logger.error('TELEGRAM_BOT_TOKEN is not configured');
        throw new UnauthorizedException('Server configuration error');
      }

      validate(initData, botToken, {
        expiresIn: 3600,
      });

      const parsed = parse(initData);
      request.telegramUser = parsed.user;
      request.telegramInitData = parsed;

      this.logger.log(`Authenticated user: ${parsed.user?.id}`);
      return true;
    } catch (error) {
      this.logger.error('Telegram auth validation failed', error);
      throw new UnauthorizedException('Invalid Telegram authentication data');
    }
  }

  private extractInitData(request: any): string | null {
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
}
