import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SalesmanEntity } from './salesman.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('customer-portfolio')
export class CustomerPortfolioEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  id_salesman: number;
  
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  value_last_purchase: number;
  
  @CreateDateColumn({ type: 'date' })
  purchase_date: Date;
  
  @OneToOne(() => SalesmanEntity, (salesman) => salesman.customerPortfolio)
  @JoinColumn({ name: 'id_salesman' })
  salesman: SalesmanEntity;  

  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer_portfolio)
  transaction: TransactionEntity;
}
