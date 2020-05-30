import AppError from "../errors/AppError";
import CoursesRepository from "../repositories/CoursesRepository";

export default class DeleteCourseService {
  public async execute(course_id: string): Promise<void> {
    const coursesRepository = new CoursesRepository();

    const course = await coursesRepository.findOne(course_id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    await coursesRepository.delete(course);
  }
}
