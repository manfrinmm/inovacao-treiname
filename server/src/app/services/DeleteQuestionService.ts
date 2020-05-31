import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import ExamQuestion from "../models/ExamQuestion";

export default class DeleteQuestionService {
  public async execute(question_id: string): Promise<void> {
    const examsRepository = getRepository(ExamQuestion);

    const question = await examsRepository.findOne(question_id);

    if (!question) {
      throw new AppError("Question not found");
    }

    await examsRepository.remove(question);
  }
}
