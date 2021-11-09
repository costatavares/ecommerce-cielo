import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from './card.entity';
import { ClientEntity } from './client.entity';
import { SalesmanEntity } from './salesman.entity';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  payment_number: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  amount_paid: number;

  @Column()
  id_card: number;

  @Column()
  id_salesman: number;

  @Column()
  id_client: number;

  @OneToOne(() => CardEntity, (card) => card.payment)
  @JoinColumn({ name: 'id_card' })
  card: CardEntity;

  @ManyToOne(() => SalesmanEntity, { cascade: ['insert', 'update', 'remove'] })
  @JoinColumn({ name: 'id_salesman' })
  salesman: SalesmanEntity[];

  @ManyToOne(() => ClientEntity, { cascade: ['insert', 'update', 'remove'] })
  @JoinColumn({ name: 'id_client' })
  client: ClientEntity[];

}
