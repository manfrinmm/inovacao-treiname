import { addDays } from "date-fns";

import AppError from "../errors/AppError";
import UserCourses from "../models/UserCourses";
import CoursesRepository from "../repositories/CoursesRepository";
import UserCoursesRepository from "../repositories/UserCoursesRepository";

interface Request {
  user_id: string;
  course_id: string;
}

export default class CreateUserCourseService {
  public async execute({ course_id, user_id }: Request): Promise<UserCourses> {
    const userCoursesRepository = new UserCoursesRepository();
    const coursesRepository = new CoursesRepository();

    const course = await coursesRepository.findOne(course_id);

    if (!course) {
      throw new AppError("Course not found", 400);
    }

    const expires_in = addDays(new Date(), course.course_expiration);

    const userCourses = await userCoursesRepository.findAllByUser(user_id);

    const userCourseAlreadyExists = userCourses.find(
      userCourse => userCourse.course_id === course_id,
    );

    if (userCourseAlreadyExists) {
      userCourseAlreadyExists.expires_in = expires_in;

      await userCoursesRepository.update(userCourseAlreadyExists);

      return userCourseAlreadyExists;
    }

    const userCourse = await userCoursesRepository.create({
      course_id,
      user_id,
      expires_in,
    });

    return userCourse;
  }
}
