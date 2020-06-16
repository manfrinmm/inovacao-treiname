import { Request, Response } from "express";

import CreateSubmitExamService from "../../services/CreateSubmitExamService";
import ShowExamService from "../../services/ShowExamService";
import ShowExamResult from "../../services/student/ShowExamResult";

class ResultExamController {
  // async store(req: Request, res: Response): Promise<Response> {
  //   const showExam = new ShowExamService();
  //   const createSubmitExam = new CreateSubmitExamService();

  //   const { course_id, questions } = req.body;
  //   const user_id = req.user.id;

  //   const exam = await showExam.execute(course_id);
  //   const examFormatted = exam.map((question, index) => ({
  //     ...question,
  //     ...questions[index],
  //   }));

  //   const SubmitExam = await createSubmitExam.execute({
  //     course_id,
  //     user_id,
  //     questions: examFormatted,
  //   });

  //   return res.status(201).json(SubmitExam);
  // }

  async show(req: Request, res: Response): Promise<Response> {
    const showExamResult = new ShowExamResult();

    const { submit_id } = req.params;

    const { accuracy, examResult } = await showExamResult.execute(submit_id);

    return res.status(200).json({ accuracy, ...examResult });
  }
}

export default new ResultExamController();
