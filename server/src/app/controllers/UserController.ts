import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const createUser = new CreateUserService();

    const { name, cpf, rg, phone, password } = req.body;

    const user = await createUser.execute({ name, cpf, rg, phone, password });

    return res.status(201).json(user);
  }
}

export default new UserController();
