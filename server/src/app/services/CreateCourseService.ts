import Course from "../models/Course";
import CoursesRepository from "../repositories/CoursesRepository";

interface ModuleData {
  name: string;
  description: string;
  video_link?: string;
  extra_link?: string;
  file: string;
}

interface Request {
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

export default class CreateCourseService {
  public async execute({
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
  }: Request): Promise<Course> {
    const courseRepository = new CoursesRepository();

    const course = await courseRepository.create({
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

    return course;
  }
}
