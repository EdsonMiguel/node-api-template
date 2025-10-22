import { IsString, MinLength } from "class-validator";

class CreateCategoryDTO {
  @IsString()
  @MinLength(3, {
    message: "O nome da categoria deve ter no mínimo 3 caracteres.",
  })
  name!: string;
}

export default CreateCategoryDTO;
