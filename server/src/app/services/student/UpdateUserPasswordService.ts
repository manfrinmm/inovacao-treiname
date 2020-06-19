import { hash } from "bcryptjs";

import UsersRepository from "../../repositories/UsersRepository";
import ShowUserService from "../ShowUserService";

interface UpdateUserPasswordRequest {
  user_id: string;
  password: string;
}

export default class UpdateUserPasswordService {
  public async execute({
    user_id,
    password,
  }: UpdateUserPasswordRequest): Promise<void> {
    const usersRepository = new UsersRepository();

    const showUser = new ShowUserService();

    const user = await showUser.execute(user_id);

    const passwordHash = await hash(password, 8);

    await usersRepository.updatePassword({ user, password: passwordHash });
  }
}
