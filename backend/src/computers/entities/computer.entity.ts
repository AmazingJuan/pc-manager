// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { Component } from '@components/entities/component.entity';
import { User } from '@users/entities/user.entity';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Computer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  status: string;

  @Column()
  purchaseDate: Date;

  @Column()
  warrantyExpirationDate: Date;

  @Column({ type: 'varchar', length: 500, default: '' })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relations

  @OneToMany(() => Component, (component: Component) => component.computer, {
    /** Permite un solo `save(computer)` tras asignar `components` (actualiza el FK en cada fila hija). */
    cascade: ['update'],
  })
  components: Component[];

  @ManyToOne(() => User, (user: User) => user.computers, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: User | null;
}
