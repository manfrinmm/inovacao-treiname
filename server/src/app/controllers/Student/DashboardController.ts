import { Request, Response } from "express";

import { classToClass } from "class-transformer";
import { isAfter } from "date-fns";

import UserCoursesRepository from "../../repositories/UserCoursesRepository";

class DashboardController {
  async index(req: Request, res: Response): Promise<Response> {
    const userCoursesRepository = new UserCoursesRepository();

    const user_id = req.user.id;

    const userCourses = await userCoursesRepository.findAllByUser(user_id);

    const userCoursesWithStatus = userCourses.map(course => {
      const courseExpired = isAfter(new Date(), course.expires_in);

      let status = null;

      if (courseExpired) {
        status = "Expirado";
      }

      const { id, name, thumbnail_url } = classToClass(course.course);

      return { id, thumbnail_url, name, status };
    });

    return res.json(userCoursesWithStatus);
  }
}

export default new DashboardController();
