import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer";

import AuthenticateUserService from "@modules/user/services/AuthenticateUserService";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token, refresh_token } = await authenticateUser.execute({
      email,
      password,
    });

    const userView = classToPlain(user);

    response.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response.json({ user: userView, token });
  }
}

export default SessionsController;
