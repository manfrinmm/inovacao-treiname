import { hash } from "bcryptjs";

import AppError from "../errors/AppError";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  password: string;
}

export default class CreateUserService {
  public async execute({
    name,
    cpf,
    rg,
    phone,
    password,
  }: Request): Promise<User> {
    const userRepository = new UsersRepository();

    const password_hash = await hash(password, 8);

    const userAlreadyExist = await userRepository.findByCpf(cpf);

    if (userAlreadyExist) {
      throw new AppError("User already exists");
    }

    const user = await userRepository.create({
      name,
      cpf,
      rg,
      phone,
      password: password_hash,
    });

    return user;
  }
}
