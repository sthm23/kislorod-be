import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
export declare class OrdersService {
    private orderRepository;
    private readonly usersService;
    constructor(orderRepository: Repository<Order>, usersService: UsersService);
    create(createOrderDto: CreateOrderDto, telegramId?: string): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order | null>;
    findByUserId(userId: string): Promise<Order[]>;
    findByTelegramId(telegramId: string): Promise<Order[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null>;
    remove(id: string): Promise<Order>;
}
