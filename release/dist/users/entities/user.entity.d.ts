import { Order } from '../../orders/entities/order.entity';
export declare class User {
    id: string;
    name: string;
    telegramId: string;
    telegramUserId: string;
    phone: string;
    username: string;
    createdAt: Date;
    orders: Order[];
}
