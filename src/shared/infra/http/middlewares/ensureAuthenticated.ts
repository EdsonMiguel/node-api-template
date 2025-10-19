import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface ITokenPayload extends JwtPayload {
  name: string;
  email: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token JWT ausente.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub, name, email } = decoded as ITokenPayload;
    request.user = {
      id: sub as string,
      name,
      email,
    };

    return next();
  } catch (err) {
    throw new AppError("Token JWT inválido.", 401);
  }
}
