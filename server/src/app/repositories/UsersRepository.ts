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

  public async findAll(): Promise<User[]> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ cpf });

    return user;
  }

  public async findOne(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id, {
      relations: ["courses"],
    });

    return user;
  }
}
