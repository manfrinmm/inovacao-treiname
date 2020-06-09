import { hash } from "bcryptjs";

import AppError from "../errors/AppError";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
  user_id: string;
  data: {
    name: string;
    cpf: string;
    rg: string;
    phone: string;
    password?: string;
    exam_practice_link?: string;
  };
}

export default class UpdateUserService {
  public async execute({ user_id, data }: Request): Promise<User> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("User not found", 400);
    }

    let userUpdated;

    if (data.password) {
      const passwordHash = await hash(data.password, 8);

      userUpdated = await usersRepository.update({
        user,
        data: { ...data, password: passwordHash },
      });
    } else {
      userUpdated = await usersRepository.update({
        user,
        data,
      });
    }

    return userUpdated;
  }
}
