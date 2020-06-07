import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

export default class ListAllCoursesService {
  public async execute(): Promise<User[]> {
    const usersRepository = new UsersRepository();

    const users = await usersRepository.findAll();

    return users;
  }
}
