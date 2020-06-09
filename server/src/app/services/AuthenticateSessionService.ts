import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../../config/auth";
import AppError from "../errors/AppError";
import Log from "../models/Log";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";
import CreateLogService from "./CreateLogService";

interface Request {
  cpf: string;
  password: string;
  ip: string;
  local: string;
}

interface Response {
  token: string;
  user: User;
  log: Log;
}

export default class CreateCourseService {
  public async execute({
    cpf,
    password,
    local,
    ip,
  }: Request): Promise<Response> {
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

    const createLog = new CreateLogService();

    const log = await createLog.execute({ user_id: user.id, ip, local });

    return {
      user,
      token,
      log,
    };
  }
}
