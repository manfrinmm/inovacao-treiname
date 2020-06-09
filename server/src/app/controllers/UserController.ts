import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import CreateUserService from "../services/CreateUserService";
import ListAllUsersService from "../services/ListAllUsersService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";

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
    const showUser = new ShowUserService();

    const { user_id } = req.params;

    const user = await showUser.execute(user_id);

    return res.status(201).json(classToClass(user));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const updateUser = new UpdateUserService();

    const { user_id } = req.params;

    const data = req.body;

    const user = await updateUser.execute({ user_id, data });

    return res.status(201).json(classToClass(user));
  }
}

export default new UserController();
