import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('log')
export class LogEntity {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('json')
  log: object;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
