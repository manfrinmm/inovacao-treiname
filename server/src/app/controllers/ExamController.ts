import { Request, Response } from "express";

import CreateExamService from "../services/CreateExamService";
import DeleteQuestionService from "../services/DeleteQuestionService";
import ShowExamService from "../services/ShowExamService";
import UpdateExamService from "../services/UpdateExamService";

class ExamController {
  async store(req: Request, res: Response): Promise<Response> {
    const createExam = new CreateExamService();

    const { course_id, questions } = req.body;

    const exam = await createExam.execute({ course_id, questions });

    return res.status(201).json(exam);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const createExam = new ShowExamService();

    const { course_id } = req.params;

    const exam = await createExam.execute(course_id);

    return res.status(200).json(exam);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const updateExam = new UpdateExamService();

    const { course_id } = req.params;
    const data = req.body;

    const exam = await updateExam.execute({ course_id, data });

    return res.status(200).json(exam);
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const deleteQuestion = new DeleteQuestionService();

    const { question_id } = req.params;

    await deleteQuestion.execute(question_id);

    return res.status(204).json();
  }
}

export default new ExamController();
