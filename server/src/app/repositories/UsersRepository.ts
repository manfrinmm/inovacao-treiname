import { getRepository, Repository } from "typeorm";

import User from "../models/User";

interface CreateUserDTO {
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  password: string;
}

export default class UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }
}
