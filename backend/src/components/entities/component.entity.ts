// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import { Computer } from '@computers/entities/computer.entity';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ unique: true })
  serialNumber: string;

  @Column()
  purchaseDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Computer, (computer) => computer.components, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'computerId' })
  computer: Computer | null;
}
