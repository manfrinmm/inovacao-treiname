import ExamQuestion from "../models/ExamQuestion";
import ExamsRepository from "../repositories/ExamsRepository";

export default class ShowExamService {
  public async execute(course_id: string): Promise<ExamQuestion[]> {
    const examsRepository = new ExamsRepository();

    const exam = await examsRepository.findByCourse(course_id);

    return exam;
  }
}
