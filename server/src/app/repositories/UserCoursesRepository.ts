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

  public async findAllByUser(user_id: string): Promise<UserCourses[]> {
    const userCourses = await this.ormRepository.find({
      relations: ["course"],
      where: { user_id },
      order: {
        created_at: -1,
      },
    });

    return userCourses;
  }

  public async create(data: CreateUserCourseDTO): Promise<UserCourses> {
    const userCourse = this.ormRepository.create(data);

    await this.ormRepository.save(userCourse);

    return userCourse;
  }

  public async update(userCourseData: UserCourses): Promise<UserCourses> {
    const userCourse = await this.ormRepository.save(userCourseData);

    return userCourse;
  }
}
