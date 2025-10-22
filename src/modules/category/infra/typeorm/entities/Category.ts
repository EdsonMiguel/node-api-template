import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Expose } from "class-transformer";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  id!: string;

  @Column({ unique: true })
  @Expose()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Category;
