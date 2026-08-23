import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'int' })
  totalOrders!: number;

  @Column({ type: 'int' })
  activeOrders!: number;

  @Column({ type: 'int' })
  reservedOrders!: number;

  @Column({ type: 'int' })
  closedOrders!: number;

  @Column({ type: 'float' })
  totalRevenue!: number;

  @Column({ type: 'float' })
  averageOrderValue!: number;
}
