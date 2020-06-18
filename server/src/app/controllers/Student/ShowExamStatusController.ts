import { Request, Response } from "express";

import ShowExamStatus from "../../services/student/ShowExamStatus";

class ShowExamStatusController {
  async show(req: Request, res: Response): Promise<Response> {
    const showExamStatus = new ShowExamStatus();

    const { course_id } = req.params;
    const user_id = req.user.id;

    const {
      accuracy,
      userCourse,
      practical_exam_url,
    } = await showExamStatus.execute({
      user_id,
      course_id,
    });

    delete userCourse.course;

    return res
      .status(200)
      .json({ accuracy, ...userCourse, practical_exam_url });
  }
}

export default new ShowExamStatusController();
