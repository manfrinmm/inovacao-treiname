import AppError from "../errors/AppError";
import ExamQuestion from "../models/ExamQuestion";
import CoursesRepository from "../repositories/CoursesRepository";
import ExamsRepository from "../repositories/ExamsRepository";

interface Request {
  course_id: string;
  data: ExamQuestion[];
}

export default class UpdateExamService {
  public async execute({ course_id, data }: Request): Promise<ExamQuestion[]> {
    const coursesRepository = new CoursesRepository();
    const examsRepository = new ExamsRepository();

    const course = await coursesRepository.findOne(course_id);

    if (!course) {
      throw new AppError("Course not found");
    }

    const exame = await examsRepository.update(data);

    return exame;
  }
}
