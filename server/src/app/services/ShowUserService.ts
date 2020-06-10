import AppError from "../errors/AppError";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

export default class ShowUserService {
  public async execute(user_id: string): Promise<User> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("Course not found", 400);
    }

    return user;
  }
}
