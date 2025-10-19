import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import AppError from "@shared/errors/AppError";

export function validateRequest(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const messages = errors
        .map((error: ValidationError) => {
          return Object.values(error.constraints || {}).join(", ");
        })
        .join("; ");

      throw new AppError(messages, 400);
    }

    next();
  };
}
