// Author: Juan Pablo Avendaño

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
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Computer, (computer: Computer) => computer.user)
  computers: Computer[];
}
