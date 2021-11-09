import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SalesmanEntity } from './salesman.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('customer-portfolio')
export class CustomerPortfolioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  id_salesman: number;

  @Column()
  address: string;

  @Column()
  fone: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  purchase_date: Date;

  @Column()
  value_last_purchase: string;

  @OneToOne(() => SalesmanEntity, (salesman) => salesman.customerPortfolio)
  @JoinColumn({ name: 'id_salesman' })
  salesman!: SalesmanEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer_portfolio)
  transaction: TransactionEntity;
}
