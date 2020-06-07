import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import CreateUserCourseService from "../services/CreateUserCourseService";
import ListAllUsersService from "../services/ListAllUsersService";

class UserCoursesController {
  async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListAllUsersService();

    const users = await listUsers.execute();

    return res.json(classToClass(users));
  }

  async store(req: Request, res: Response): Promise<Response> {
    const createUserCourse = new CreateUserCourseService();

    const { course_id, user_id } = req.body;

    const userCourse = await createUserCourse.execute({ course_id, user_id });

    return res.status(201).json(userCourse);
  }
}

export default new UserCoursesController();
