import AppError from "../../errors/AppError";
import SubmitExam from "../../models/schemas/SubmitExam";
import SubmitExamsRepository from "../../repositories/SubmitExamsRepository";

interface GetExamResultResponse {
  examResult?: SubmitExam;
  accuracy: number;
}

export default class GetExamResultService {
  public async execute(submit_id: string): Promise<GetExamResultResponse> {
    const submitExamsRepository = new SubmitExamsRepository();

    const exam = await submitExamsRepository.findOne(submit_id);

    if (!exam) {
      throw new AppError("Exam not found");
    }

    let accuracy = 0;

    exam.questions.forEach(question => {
      if (question.correct_answer === question.answer_mark) {
        accuracy += 1 / exam.questions.length;
      }
    });

    if (accuracy >= 0.7) {
      // Call Jobs to generate certification.

      return { examResult: exam, accuracy };
    }

    return { accuracy };
  }
}
