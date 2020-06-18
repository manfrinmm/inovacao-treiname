import { Request, Response } from "express";

import ShowSubmitExamService from "../../services/Admin/ShowSubmitExamService";

class ExamResultController {
  async show(req: Request, res: Response): Promise<Response> {
    const showSubmitExam = new ShowSubmitExamService();

    const { exam_submit_id } = req.params;

    const submitExam = await showSubmitExam.execute(exam_submit_id);

    return res.status(200).json(submitExam);
  }
}

export default new ExamResultController();
