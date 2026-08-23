import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ unique: true })
  telegramId!: string;

  @Column({ nullable: true })
  telegramUserId!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  username!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
