import { IsString, IsEmail, MinLength } from "class-validator";

// Agora é uma classe, não uma interface
class CreateUserDTO {
  @IsString({ message: "O nome deve ser um texto." })
  name!: string;

  @IsEmail({}, { message: "Por favor, forneça um email válido." })
  email!: string;

  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres." })
  password!: string;
}

export default CreateUserDTO;
