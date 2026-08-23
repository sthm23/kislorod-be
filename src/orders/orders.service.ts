import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
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

    const order = this.orderRepository.create({
      ...createOrderDto,
      userId,
      startDate: new Date(createOrderDto.startDate),
      endDate: createOrderDto.endDate ? new Date(createOrderDto.endDate) : null,
    });

    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  findByUserId(userId: string) {
    return this.orderRepository.find({
      where: { userId },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
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

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updateData: any = {
      ...updateOrderDto,
    };

    if (updateOrderDto.startDate) {
      updateData.startDate = new Date(updateOrderDto.startDate);
    }

    if (updateOrderDto.endDate) {
      updateData.endDate = new Date(updateOrderDto.endDate);
    }

    await this.orderRepository.update(id, updateData);

    return this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.orderRepository.remove(order);
  }
}
