import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../../config/auth";
import AppError from "../errors/AppError";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
  cpf: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

export default class CreateCourseService {
  public async execute({ cpf, password }: Request): Promise<Response> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError("Wrong credentials", 401);
    }

    const passwordCompared = await compare(password, user.password);

    if (!passwordCompared) {
      throw new AppError("Wrong credentials", 401);
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}
