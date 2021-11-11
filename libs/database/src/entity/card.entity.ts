import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  card_number: string;

  @OneToOne(() => PaymentEntity, (payment) => payment.card)
  payment: PaymentEntity;
}
