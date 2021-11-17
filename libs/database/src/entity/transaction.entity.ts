import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentEntity } from '.';
import { CustomerPortfolioEntity } from './customer-portfolio.entity';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  amount: number;
  
  @Column()
  id_customer_portfolio: number;

  @Column()
  payment_id: number; 

  @ManyToOne(() => CustomerPortfolioEntity, { cascade: ['insert', 'update', 'remove'] })
  @JoinColumn({ name: 'id_customer_portfolio' })
  customer_portfolio: CustomerPortfolioEntity[];
  
  @OneToOne(() => PaymentEntity, (payment) => payment.transaction, { cascade: true })
  @JoinColumn({ name: 'payment_id'})
  payment: PaymentEntity;

}
