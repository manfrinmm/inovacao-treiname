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

interface UpdateCourseDTO {
  course: Course;
  data: CreateCourseDTO;
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

  public async findOne(course_id: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne(course_id, {
      relations: ["modules"],
    });

    return course;
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

  public async update({ course, data }: UpdateCourseDTO): Promise<Course> {
    const courseUpdated = this.ormRepository.merge(course, data);

    await this.ormRepository.save(courseUpdated);

    return courseUpdated;
  }

  public async delete(course: Course): Promise<void> {
    await this.ormRepository.remove(course);
  }
}
