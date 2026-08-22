import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) { }


  async create(createOrderDto: CreateOrderDto, telegramId?: string) {
    let userId = createOrderDto.userId;

    if (telegramId && !userId) {
      const user = await this.usersService.findByTelegramId(telegramId);
      if (user) {
        userId = user.id;
      }
    }

    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        userId,
        startDate: new Date(createOrderDto.startDate),
        endDate: createOrderDto.endDate ? new Date(createOrderDto.endDate) : null,
      },
      include: {
        user: true,
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  findByUserId(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByTelegramId(telegramId: string) {
    const user = await this.usersService.findByTelegramId(telegramId);

    if (!user) {
      return [];
    }

    return this.findByUserId(user.id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
        startDate: updateOrderDto.startDate ? new Date(updateOrderDto.startDate) : undefined,
        endDate: updateOrderDto.endDate ? new Date(updateOrderDto.endDate) : undefined,
        updatedAt: new Date(),
      },
      include: {
        user: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.order.delete({
      where: { id }
    })
  }
}
