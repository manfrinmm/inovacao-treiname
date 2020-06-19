import { getRepository, Repository } from "typeorm";

import User from "../models/User";

interface CreateUserDTO {
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  password: string;
}

interface UpdateUserDTO {
  user: User;
  data: {
    name: string;
    cpf: string;
    rg: string;
    phone: string;
    password?: string;
    exam_practice_link?: string;
  };
}

interface UpdateUserPasswordDTO {
  user: User;
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
      relations: ["courses", "courses.course", "logs"],
    });

    return user;
  }

  public async update({ user, data }: UpdateUserDTO): Promise<User> {
    const userUpdated = this.ormRepository.merge(user, data);

    await this.ormRepository.save(userUpdated);

    return userUpdated;
  }

  public async updatePassword({
    user,
    password,
  }: UpdateUserPasswordDTO): Promise<User> {
    const userUpdated = {
      ...user,
      password,
    };

    await this.ormRepository.save(userUpdated);

    return userUpdated;
  }
}
