import bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./types";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: "USER" as Role,
  })
  role: string;

  @Column({
    default: 0,
  })
  tokenVersion: number;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isPasswordValid(hash: string) {
    return bcrypt.compareSync(hash, this.password);
  }
}
