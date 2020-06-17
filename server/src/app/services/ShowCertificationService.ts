import { classToClass } from "class-transformer";

import AppError from "../errors/AppError";
import UserCoursesRepository from "../repositories/UserCoursesRepository";
import UsersRepository from "../repositories/UsersRepository";

interface ShowCertificationResponse {
  name: string;
  certification_url: string;
}

export default class ShowCertificationService {
  public async execute(
    certification: string,
  ): Promise<ShowCertificationResponse> {
    const usersRepository = new UsersRepository();
    const userCoursesRepository = new UserCoursesRepository();

    const userCourse = await userCoursesRepository.findByCertification(
      certification,
    );

    if (!userCourse) {
      throw new AppError("Certification for user course not found");
    }

    const { user_id } = userCourse;

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const { certification_url } = classToClass(userCourse);

    return { name: user.name, certification_url };
  }
}
