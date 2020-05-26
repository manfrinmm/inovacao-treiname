import Course from "../models/Course";
import CoursesRepository from "../repositories/CoursesRepository";

export default class ListAllCoursesService {
  public async execute(): Promise<Course[]> {
    const coursesRepository = new CoursesRepository();

    const courses = await coursesRepository.findAll();

    return courses;
  }
}
