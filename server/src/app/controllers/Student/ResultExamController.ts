import { Request, Response } from "express";

import ShowExamService from "../../services/ShowExamService";
import CreateSubmitExamService from "../../services/student/CreateSubmitExamService";
import ShowExamResult from "../../services/student/GetExamResultService";

class ResultExamController {
  async show(req: Request, res: Response): Promise<Response> {
    const showExamResult = new ShowExamResult();

    const { submit_id } = req.params;

    const { accuracy, examResult } = await showExamResult.execute(submit_id);

    return res.status(200).json({ accuracy, ...examResult });
  }
}

export default new ResultExamController();
