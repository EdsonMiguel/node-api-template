import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import AppError from "@shared/errors/AppError";

// Esta é uma "High-Order Function" (uma função que retorna outra função)
// Ela recebe a 'classe' do DTO que queremos validar
export function validateRequest(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1. Converte o 'request.body' (objeto puro) em uma 'instância' da classe DTO
    const dtoInstance = plainToClass(dtoClass, req.body);

    // 2. Roda as validações (ex: @IsEmail, @MinLength) na instância
    const errors = await validate(dtoInstance);

    // 3. Se houver erros...
    if (errors.length > 0) {
      // Formata os erros para ficar uma lista legível
      const messages = errors
        .map((error: ValidationError) => {
          return Object.values(error.constraints || {}).join(", ");
        })
        .join("; ");

      // 4. Dispara nosso AppError (que será pego pelo "para-raios" global)
      throw new AppError(messages, 400); // 400 = Bad Request
    }

    // 5. Se não houver erros, passa para o próximo middleware (o Controller)
    next();
  };
}
