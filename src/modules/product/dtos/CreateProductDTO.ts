import { IsString, IsNumber, IsPositive, IsUUID } from "class-validator";

class CreateProductDTO {
  @IsString()
  name!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price!: number;

  @IsUUID(undefined, { message: "O ID da categoria deve ser um UUID válido." })
  category_id!: string;
}

export default CreateProductDTO;
