import AppError from "../errors/AppError";
import Log from "../models/Log";
import LogsRepository from "../repositories/LogsRepository";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
  user_id: string;
  local: string;
  ip: string;
}

export default class CreateLogService {
  public async execute({ user_id, local, ip }: Request): Promise<Log> {
    const logsRepository = new LogsRepository();
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const log = await logsRepository.create({
      user_id,
      local,
      ip,
    });

    return log;
  }
}
