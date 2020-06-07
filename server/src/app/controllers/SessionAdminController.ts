import { Request, Response } from "express";

import { compare } from "bcryptjs";
import { classToClass } from "class-transformer";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

import authConfig from "../../config/auth";
import Admin from "../models/Admin";

class SessionAdminController {
  async store(req: Request, res: Response): Promise<Response> {
    const adminsRepository = getRepository(Admin);

    console.log(req);

    const { cpf, password } = req.body;

    const user = await adminsRepository.findOne({ where: { cpf } });

    if (!user) {
      return res.status(400).json({ message: "User not authorized" });
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id,
    });

    return res.json({ token });
  }
}

export default new SessionAdminController();
