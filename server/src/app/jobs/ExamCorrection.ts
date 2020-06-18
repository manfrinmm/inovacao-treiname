import Queue from "../../libs/Queue";
import AppError from "../errors/AppError";
import SubmitExamsRepository from "../repositories/SubmitExamsRepository";
import GenerateCertification from "./GenerateCertification";

class ExamCorrection {
  get key() {
    return "ExamCorrection";
  }

  async handle({ data }: any) {
    const submitExamsRepository = new SubmitExamsRepository();

    const { submit_id, hasPracticalExam } = data;

    const exam = await submitExamsRepository.findOne(submit_id);

    if (!exam) {
      throw new AppError(`[${this.key}]:Error -> Exam not found`);
    }

    let accuracy = 0;
    exam.questions.forEach(question => {
      if (question.correct_answer === question.answer_mark) {
        accuracy += 1 / exam.questions.length;
      }
    });

    await submitExamsRepository.updateAccuracy({ accuracy, submit_id });

    if (accuracy >= 0.7 && !hasPracticalExam) {
      console.log(`Calling job: ${GenerateCertification.key}`);
      await Queue.add(GenerateCertification.key, {
        course_id: exam.course_id,
        user_id: exam.user_id,
      });
    }

    console.log(`Executed job: ExamCorrection`);
  }
}

export default new ExamCorrection();
