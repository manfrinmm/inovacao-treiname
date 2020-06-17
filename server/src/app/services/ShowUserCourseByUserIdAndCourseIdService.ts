import AppError from "../errors/AppError";
import UserCourses from "../models/UserCourses";
import UserCoursesRepository from "../repositories/UserCoursesRepository";

interface Request {
  user_id: string;
  course_id: string;
}

export default class ShowUserCourseByUserIdAndCourseIdService {
  public async execute({ course_id, user_id }: Request): Promise<UserCourses> {
    const userCoursesRepository = new UserCoursesRepository();

    const userCourses = await userCoursesRepository.findAllByUser(user_id);

    const userCourse = userCourses.find(
      userCourseItem => userCourseItem.course_id === course_id,
    );

    if (!userCourse) {
      throw new AppError("User course not found");
    }

    return userCourse;
  }
}
