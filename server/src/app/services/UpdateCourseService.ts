import AppError from "../errors/AppError";
import Course from "../models/Course";
import CoursesRepository from "../repositories/CoursesRepository";

interface Request {
  course_id: string;
  data: Course;
}

export default class UpdateCourseService {
  public async execute({ course_id, data }: Request): Promise<Course> {
    const coursesRepository = new CoursesRepository();

    let course = await coursesRepository.findOne(course_id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    course = await coursesRepository.update({ course, data });

    return course;
  }
}
