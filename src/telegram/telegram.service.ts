import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf, Markup, Context } from 'telegraf';
import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;
  private readonly logger = new Logger(TelegramService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
    }
    this.bot = new Telegraf(token);
    this.setupHandlers();
  }

  async onModuleInit() {
    try {
      await this.bot.launch();
      this.logger.log('Telegram bot started successfully');
    } catch (error) {
      this.logger.error('Failed to start Telegram bot', error);
    }
  }

  private setupHandlers() {
    this.bot.start(async (ctx) => {
      const user = ctx.from;

      await ctx.reply(
        `Привет, ${user.first_name}! 👋\n\nДобро пожаловать в сервис аренды кислородных баллонов.\n\nДля продолжения работы, пожалуйста, поделитесь своим номером телефона.`,
        Markup.keyboard([
          Markup.button.contactRequest('📱 Поделиться номером телефона'),
        ]).resize()
      );
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

        await this.replyWithMiniAppButton(
          ctx,
          '✅ Спасибо! Ваш номер телефона сохранен.\n\nТеперь вы можете пользоваться нашим приложением.',
        );

        this.logger.log(`User registered: ${createdUser.id} - ${createdUser.phone}`);
      } catch (error) {
        this.logger.error('Error saving user', error);
        await ctx.reply('❌ Произошла ошибка при сохранении данных. Попробуйте еще раз.');
      }
    });

    this.bot.command('help', async (ctx) => {
      await ctx.reply(
        `Доступные команды:\n\n` +
        `/start - Начать работу с ботом\n` +
        `/help - Показать это сообщение\n` +
        `/app - Открыть приложение`
      );
    });

    this.bot.command('app', async (ctx) => {
      await this.replyWithMiniAppButton(
        ctx,
        'Откройте приложение для создания заказа:',
      );
    });
  }

  private getMiniAppUrl(): string {
    return (
      this.configService.get<string>('TELEGRAM_MINI_APP_URL') ||
      'https://kislorod.example.com'
    );
  }

  private isValidMiniAppUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return (
        parsed.protocol === 'https:' &&
        parsed.hostname !== 't.me' &&
        parsed.hostname !== 'telegram.me'
      );
    } catch {
      return false;
    }
  }

  private async replyWithMiniAppButton(
    ctx: Context,
    message: string,
  ) {
    const miniAppUrl = this.getMiniAppUrl();

    if (this.isValidMiniAppUrl(miniAppUrl)) {
      await ctx.reply(
        message,
        Markup.keyboard([
          Markup.button.webApp('🚀 Открыть приложение', miniAppUrl),
        ]).resize(),
      );
      return;
    }

    this.logger.warn(
      `TELEGRAM_MINI_APP_URL is invalid for web_app button: ${miniAppUrl}`,
    );
    await ctx.reply(
      `${message}\n\nСейчас кнопка Mini App недоступна. Укажите HTTPS URL вашего Mini App в TELEGRAM_MINI_APP_URL.`,
    );
  }

  getBot(): Telegraf {
    return this.bot;
  }

  async onModuleDestroy() {
    await this.bot.stop();
    this.logger.log('Telegram bot stopped');
  }
}
