import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, telegramUserId: number): Promise<import("./entities/order.entity").Order>;
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findMyOrders(telegramUserId: number): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: string): Promise<import("./entities/order.entity").Order | null>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("./entities/order.entity").Order | null>;
    remove(id: string): Promise<import("./entities/order.entity").Order>;
}
