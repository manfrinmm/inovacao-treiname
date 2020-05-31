import AppError from "../errors/AppError";
import ExamQuestion from "../models/ExamQuestion";
import CoursesRepository from "../repositories/CoursesRepository";
import ExamsRepository from "../repositories/ExamsRepository";

interface Request {
  course_id: string;
  questions: Array<{
    title: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    correct_answer: string;
  }>;
}

export default class CreateExamService {
  public async execute({
    course_id,
    questions,
  }: Request): Promise<ExamQuestion[]> {
    const examsRepository = new ExamsRepository();
    const coursesRepository = new CoursesRepository();

    const course = coursesRepository.findOne(course_id);

    if (!course) {
      throw new AppError("Course not found");
    }

    const examData = questions.map(question => ({ course_id, ...question }));

    const exam = await examsRepository.create(examData);

    return exam;
  }
}
