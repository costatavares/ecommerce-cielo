import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerPortfolioEntity } from './customer-portfolio.entity';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_customer_portfolio: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  added_amount: number;

  @ManyToOne(() => CustomerPortfolioEntity, { cascade: ['insert', 'update', 'remove'] })
  @JoinColumn({ name: 'id_customer_portfolio' })
  customer_portfolio: CustomerPortfolioEntity[];
  
}
