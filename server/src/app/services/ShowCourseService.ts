import AppError from "../errors/AppError";
import Course from "../models/Course";
import CoursesRepository from "../repositories/CoursesRepository";

export default class DeleteCourseService {
  public async execute(course_id: string): Promise<Course> {
    const coursesRepository = new CoursesRepository();

    const course = await coursesRepository.findOne(course_id);

    if (!course) {
      throw new AppError("Course not found", 400);
    }

    return course;
  }
}
