import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  user_type: number;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @BeforeInsert()
  hasPassword(){
    this.password =  hashSync(this.password,10)
  }
}


