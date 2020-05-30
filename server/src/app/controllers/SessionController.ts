import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import AuthenticateSessionService from "../services/AuthenticateSessionService";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const authenticateSession = new AuthenticateSessionService();

    const { cpf, password } = req.body;

    const { user, token } = await authenticateSession.execute({
      cpf,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}

export default new SessionController();
