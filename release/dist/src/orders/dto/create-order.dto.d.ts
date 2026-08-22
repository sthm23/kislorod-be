import { OrderStatus } from "../../../generated/prisma/browser";
export declare class CreateOrderDto {
    productName: string;
    startDate: string;
    endDate?: string;
    pricePerDay: number;
    phoneNumber: string;
    location: string;
    status: OrderStatus;
    userId?: string;
}
