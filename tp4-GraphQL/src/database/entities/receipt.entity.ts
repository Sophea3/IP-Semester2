import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId: string;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column()
  issuedAt: Date;
}