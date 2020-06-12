import { Request, Response } from "express";

import UserCoursesRepository from "../../repositories/UserCoursesRepository";
import ShowCourseService from "../../services/ShowCourseService";
import ShowExamService from "../../services/ShowExamService";

class ExamController {
  async show(req: Request, res: Response): Promise<Response> {
    const userCoursesRepository = new UserCoursesRepository();

    const showExam = new ShowExamService();
    const showCourse = new ShowCourseService();

    const { course_id } = req.params;

    const userCourses = await userCoursesRepository.findAllByUser(req.user.id);

    const userAlreadyContentCourse = userCourses.find(
      ({ course }) => course.id === course_id,
    );

    if (!userAlreadyContentCourse) {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this exam course." });
    }

    if (
      userAlreadyContentCourse.exam_submit_id &&
      userAlreadyContentCourse.certification_id
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to access this exam course. Because You already submitted this exam.",
      });
    }

    const exam = await showExam.execute(course_id);
    const course = await showCourse.execute(course_id);

    const formattedExam = exam.map(
      ({ id, title, answer_a, answer_b, answer_c, answer_d }) => ({
        id,
        title,
        answer_a,
        answer_b,
        answer_c,
        answer_d,
      }),
    );

    const name = `Prova de ${course.name}`;

    return res.status(200).json({ name, questions: formattedExam });
  }
}

export default new ExamController();
