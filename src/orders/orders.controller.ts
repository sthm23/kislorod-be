import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TelegramAuthGuard } from '../common/guards/telegram-auth.guard';
import { TelegramUser } from '../common/decorators/telegram-user.decorator';

@Controller('orders')
@UseGuards(TelegramAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @TelegramUser('id') telegramUserId: number) {
    return this.ordersService.create(createOrderDto, telegramUserId?.toString());
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('my')
  async findMyOrders(@TelegramUser('id') telegramUserId: number) {
    return this.ordersService.findByTelegramId(telegramUserId?.toString());
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ordersService.remove(id);
  }
}
