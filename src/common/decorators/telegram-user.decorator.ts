import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TelegramUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.telegramUser;

    return data ? user?.[data] : user;
  },
);

export const TelegramInitData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.telegramInitData;
  },
);
