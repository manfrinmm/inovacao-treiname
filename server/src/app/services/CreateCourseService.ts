import { hash } from "bcryptjs";

import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
  name: string;
  category: string;
  modality: string;
  workload: number;
  value: number;
  description: string;
  target_audience: string;
  thumbnail: string;
  course_expiration: number;
  certificate_validity: number;
  approved_by: string;
  illustrative_video: string;
  learns: Array<string>;
  modules: Array<string>;
}

export default class CreateUserService {
  public async execute({
    name,
    category,
    modality,
    workload,
    value,
    description,
    target_audience,
    thumbnail,
    course_expiration,
    certificate_validity,
    approved_by,
    illustrative_video,
    learns,
    modules,
  }: Request): Promise<User> {
    const userRepository = new UsersRepository();

    const password_hash = await hash(password, 8);

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
