import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer"; // <-- Importante para a View!

@Entity("users") // Diz ao TypeORM que esta classe é a tabela 'users'
class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column() // Coluna padrão (varchar)
  name!: string;

  @Column({ unique: true }) // O email deve ser único no banco
  email!: string;

  @Column()
  @Exclude() // <-- DECORATOR DA VIEW (class-transformer)
  password!: string; // A senha será armazenada como hash

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default User;
