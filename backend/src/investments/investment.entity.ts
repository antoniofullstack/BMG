import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Portfolio } from '../portfolios/portfolios.entity';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column()
  purchaseDate: Date;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.investments)
  portfolio: Portfolio;
}
