import { IsString, IsEmail } from "class-validator";

class CreateSessionDTO {
  @IsEmail({}, { message: "Por favor, forneça um email válido." })
  email!: string;

  @IsString({ message: "A senha deve ser um texto." })
  password!: string;
}

export default CreateSessionDTO;
