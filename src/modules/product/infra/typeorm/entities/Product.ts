import Category from "@modules/category/infra/typeorm/entities/Category";
import { Expose, Type } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  id!: string;

  @Column()
  @Expose()
  name!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  @Expose()
  price!: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  @Expose()
  @Type(() => Category)
  category!: Category;

  @CreateDateColumn()
  @Expose()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Product;
