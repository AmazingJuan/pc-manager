// Author: Andru Quiroz

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
  RelationId,
} from 'typeorm';

@Entity()
export class ComputerStatusHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  previousStatus: string;

  @Column()
  newStatus: string;

  @CreateDateColumn()
  changedAt: Date;

  // Relations

  @ManyToOne(() => Computer, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'computerId' })
  computer: Computer;

  @RelationId((h: ComputerStatusHistory) => h.computer)
  computerId: number;
}
