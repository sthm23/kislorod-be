import { User } from '../../users/entities/user.entity';
export declare enum OrderStatus {
    ACTIVE = "ACTIVE",
    RESERVED = "RESERVED",
    CLOSED = "CLOSED"
}
export declare class Order {
    id: string;
    productName: string;
    startDate: Date;
    endDate: Date | null;
    pricePerDay: number;
    phoneNumber: string;
    location: string;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date | null;
    userId: string | null;
    user: User | null;
}
