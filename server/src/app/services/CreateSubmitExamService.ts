import AppError from "../errors/AppError";
import ExamQuestion from "../models/ExamQuestion";
import SubmitExam from "../models/schemas/SubmitExam";
import CoursesRepository from "../repositories/CoursesRepository";
import ExamsRepository from "../repositories/ExamsRepository";
import SubmitExamsRepository from "../repositories/SubmitExamsRepository";

interface Request {
  course_id: string;
  user_id: string;
  questions: Array<{
    title: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    correct_answer: string;
    answer_mark: string;
  }>;
}

export default class CreateSubmitExamService {
  public async execute({
    course_id,
    user_id,
    questions,
  }: Request): Promise<SubmitExam> {
    const coursesRepository = new CoursesRepository();
    const submitExamsRepository = new SubmitExamsRepository();

    const course = await coursesRepository.findOne(course_id);

    if (!course) {
      throw new AppError("Course not found");
    }

    const submitExam = await submitExamsRepository.create({
      course_id,
      user_id,
      questions,
    });

    return submitExam;
  }
}
