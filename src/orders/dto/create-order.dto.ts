import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'generated/prisma/browser';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    productName!: string

    @IsNotEmpty()
    @IsString()
    startDate!: string

    @IsOptional()
    @IsString()
    endDate?: string

    @IsNotEmpty()
    @IsNumber()
    pricePerDay!: number

    @IsNotEmpty()
    @IsString()
    phoneNumber!: string

    @IsNotEmpty()
    @IsString()
    location!: string

    @IsNotEmpty()
    status!: OrderStatus

    @IsNotEmpty()
    @IsString()
    createdAt!: string

    @IsOptional()
    @IsString()
    updatedAt?: string
}
