import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import AuthenticateSessionService from "../services/AuthenticateSessionService";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const authenticateSession = new AuthenticateSessionService();

    const {
      cpf,
      password,
      countryCode,
      regionName,
      city,
      query: ip,
    } = req.body;

    const local = `${city} | ${regionName} | ${countryCode}`;

    const { user, token, log } = await authenticateSession.execute({
      cpf,
      password,
      local,
      ip,
    });

    return res.json({ user: classToClass(user), token, log });
  }
}

export default new SessionController();
