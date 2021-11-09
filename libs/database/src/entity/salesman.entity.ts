import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerPortfolioEntity } from './customer-portfolio.entity';
import { PaymentEntity } from './payment.entity';

@Entity('salesman')
export class SalesmanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fone: string;

  @Column()
  email: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @OneToOne(() => CustomerPortfolioEntity, (customerPortfolio) => customerPortfolio.salesman)
  customerPortfolio!: CustomerPortfolioEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.salesman)
  payment: PaymentEntity;
}
