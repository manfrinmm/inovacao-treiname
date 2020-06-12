import AppError from "../../errors/AppError";
import SubmitExam from "../../models/schemas/SubmitExam";
import SubmitExamsRepository from "../../repositories/SubmitExamsRepository";

interface Response {
  examResult?: SubmitExam;
  accuracy: number;
}

export default class ShowExamResult {
  public async execute(submit_id: string): Promise<Response> {
    const submitExamsRepository = new SubmitExamsRepository();

    const examResult = await submitExamsRepository.findOne(submit_id);

    if (!examResult) {
      throw new AppError("Exam result not found");
    }
    let accuracy = 0;

    examResult.questions.forEach(question => {
      if (question.correct_answer === question.answer_mark) {
        accuracy += 1 / examResult.questions.length;
      }
    });

    if (accuracy >= 0.7) {
      return { examResult, accuracy };
    }

    return { accuracy };
  }
}
