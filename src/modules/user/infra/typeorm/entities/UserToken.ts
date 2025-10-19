import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity("user_tokens") // Nome da tabela
class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // O "corpo" do refresh token
  @Column()
  token!: string;

  // O ID do usuário dono deste token
  @Column()
  user_id!: string;

  // Criamos a Relação (Muitos tokens para 1 usuário)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" }) // Qual coluna é a chave estrangeira
  user!: User;

  // Quando o token expira
  @Column("timestamp with time zone")
  expires_at!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default UserToken;
