import { getRepository, Repository } from "typeorm";

import Course from "../models/Course";

interface ModuleData {
  name: string;
  description: string;
  video_link?: string;
  extra_link?: string;
  file: string;
}

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
  modules: Array<ModuleData>;
}

export default class CoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async findAll(): Promise<Course[]> {
    const courses = await this.ormRepository.find({
      relations: ["modules"],
    });

    return courses;
  }

  public async create(courseData: CreateCourseDTO): Promise<Course> {
    const {
      name,
      category,
      modality,
      workload,
      value,
      description,
      target_audience,
      thumbnail,
      course_expiration,
      certificate_validity,
      approved_by,
      illustrative_video,
      learns,
      modules,
    } = courseData;

    const course = this.ormRepository.create({
      name,
      category,
      modality,
      workload,
      value,
      description,
      target_audience,
      thumbnail,
      course_expiration,
      certificate_validity,
      approved_by,
      illustrative_video,
      learns,
      modules,
    });

    await this.ormRepository.save(course);

    return course;
  }
}
