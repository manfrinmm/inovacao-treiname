import { getRepository, Repository } from "typeorm";

import UserCourses from "../models/UserCourses";

interface CreateUserCourseDTO {
  user_id: string;
  course_id: string;
  expires_in: Date;
}

export default class UserCoursesRepository {
  private ormRepository: Repository<UserCourses>;

  constructor() {
    this.ormRepository = getRepository(UserCourses);
  }

  public async findAll(): Promise<UserCourses[]> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async create(data: CreateUserCourseDTO): Promise<UserCourses> {
    const userCourse = this.ormRepository.create(data);

    await this.ormRepository.save(userCourse);

    return userCourse;
  }
}
