// Author: Juan Manuel Zapata

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column()
  serialNumber: string;

  @Column()
  purchaseDate: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  //RELATIONS PENDING
}
