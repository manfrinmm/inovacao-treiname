import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import CreateCourseService from "../services/CreateCourseService";
import DeleteCourseService from "../services/DeleteCourseService";
import ListAllCoursesService from "../services/ListAllCoursesService";
import ShowCourseService from "../services/ShowCourseService";
import UpdateCourseService from "../services/UpdateCourseService";

class CourseController {
  async index(req: Request, res: Response): Promise<Response> {
    const listAllCourses = new ListAllCoursesService();

    const courses = await listAllCourses.execute();

    return res.status(200).json(classToClass(courses));
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

    const course = await createCourse.execute({
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

    return res.status(201).json(classToClass(course));
  }

  async show(req: Request, res: Response): Promise<Response> {
    const showCourse = new ShowCourseService();

    const { course_id } = req.params;

    const course = await showCourse.execute(course_id);

    return res.json(course);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const updateCourse = new UpdateCourseService();

    const { course_id } = req.params;
    const data = req.body;

    const course = await updateCourse.execute({ course_id, data });

    return res.json(course);
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const deleteCourse = new DeleteCourseService();

    const { course_id } = req.params;

    await deleteCourse.execute(course_id);

    return res.status(204).json();
  }
}

export default new CourseController();
