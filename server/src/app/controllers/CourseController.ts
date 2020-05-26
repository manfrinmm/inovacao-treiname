import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import CreateCourseService from "../services/CreateCourseService";
import ListAllCoursesService from "../services/ListAllCoursesService";

class CourseController {
  async index(req: Request, res: Response): Promise<Response> {
    const listAllCourses = new ListAllCoursesService();

    const courses = await listAllCourses.execute();

    return res.status(200).json(courses);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const createCourse = new CreateCourseService();

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
    } = req.body;

    const user = await createCourse.execute({
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

    return res.status(201).json(classToClass(user));
  }
}

export default new CourseController();
