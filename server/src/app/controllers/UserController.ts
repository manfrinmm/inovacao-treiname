import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import CreateUserService from "../services/CreateUserService";
import ListAllUsersService from "../services/ListAllUsersService";

class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListAllUsersService();

    const users = await listUsers.execute();

    return res.json(classToClass(users));
  }

  async store(req: Request, res: Response): Promise<Response> {
    const createUser = new CreateUserService();

    const { name, cpf, rg, phone, password } = req.body;

    const user = await createUser.execute({ name, cpf, rg, phone, password });

    return res.status(201).json(classToClass(user));
  }

  async show(req: Request, res: Response): Promise<Response> {
    const createUser = new CreateUserService();

    const { user_id } = req.params;

    const user = await createUser.execute({ name, cpf, rg, phone, password });

    return res.status(201).json(classToClass(user));
  }
}

export default new UserController();
