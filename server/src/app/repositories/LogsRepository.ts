import { getRepository, Repository } from "typeorm";

import Log from "../models/Log";

interface CreateLogDTO {
  user_id: string;
  local: string;
  ip: string;
}

export default class UsersRepository {
  private ormRepository: Repository<Log>;

  constructor() {
    this.ormRepository = getRepository(Log);
  }

  public async findAll(): Promise<Log[]> {
    const logs = await this.ormRepository.find({
      order: {
        created_at: 1,
      },
    });

    return logs;
  }

  public async findAllByUser(user_id: string): Promise<Log[]> {
    const logs = await this.ormRepository.find({
      where: {
        user_id,
      },
      order: {
        created_at: 1,
      },
    });

    return logs;
  }

  public async create(logData: CreateLogDTO): Promise<Log> {
    const log = this.ormRepository.create(logData);

    await this.ormRepository.save(log);

    return log;
  }
}
