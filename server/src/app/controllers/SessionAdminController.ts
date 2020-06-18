import { Request, Response } from "express";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

import authConfig from "../../config/auth";
import Admin from "../models/Admin";

class SessionAdminController {
  async store(req: Request, res: Response): Promise<Response> {
    const adminsRepository = getRepository(Admin);

    const { cpf, password } = req.body;

    const admin = await adminsRepository.findOne({ where: { cpf } });

    if (!admin) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const passwordCompare = await compare(password, admin.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "User not authorize" });
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      expiresIn,
      subject: admin.id,
    });

    return res.json({ token });
  }
}

export default new SessionAdminController();
