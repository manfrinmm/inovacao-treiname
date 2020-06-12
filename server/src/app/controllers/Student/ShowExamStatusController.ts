import { Request, Response } from "express";

import CreateSubmitExamService from "../../services/CreateSubmitExamService";
import ShowExamService from "../../services/ShowExamService";
import ShowExamStatus from "../../services/student/ShowExamStatus";

class SubmitExamController {
  async show(req: Request, res: Response): Promise<Response> {
    const showExamStatus = new ShowExamStatus();

    const { course_id } = req.params;
    const user_id = req.user.id;

    const examStatus = await showExamStatus.execute({ user_id, course_id });

    delete examStatus.course;

    return res.status(200).json(examStatus);
  }
}

export default new SubmitExamController();
