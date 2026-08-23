import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum OrderStatus {
  ACTIVE = 'ACTIVE',
  RESERVED = 'RESERVED',
  CLOSED = 'CLOSED',
}

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  productName!: string;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date | null = null;

  @Column({ type: 'float' })
  pricePerDay!: number;

  @Column()
  phoneNumber!: string;

  @Column()
  location!: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status!: OrderStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date;

  @Column({ nullable: true })
  userId!: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
