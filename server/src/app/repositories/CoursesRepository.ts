import { getRepository, Repository } from "typeorm";

import Course from "../models/Course";

interface CreateCourseDTO {
  name: string;
  category: string;
  modality: string;
  workload: number;
  value: number;
  description: string;
  target_audience: string;
  thumbnail: string;
  course_expiration: number;
  certificate_validity: number;
  approved_by: string;
  illustrative_video: string;
  learns: Array<string>;
  modules: Array<string>;
}

export default class CoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async findAll(): Promise<Course[]> {
    const courses = await this.ormRepository.find();

    return courses;
  }

  public async create(courseData: CreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create(courseData);

    await this.ormRepository.save(course);

    return course;
  }
}
