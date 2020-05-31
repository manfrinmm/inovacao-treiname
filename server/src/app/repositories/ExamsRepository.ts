import { getRepository, Repository } from "typeorm";

import ExamQuestion from "../models/ExamQuestion";

interface CreateExamQuestionDTO {
  course_id: string;
  title: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: string;
}

export default class ExamsRepository {
  private ormRepository: Repository<ExamQuestion>;

  constructor() {
    this.ormRepository = getRepository(ExamQuestion);
  }

  public async create(
    examData: CreateExamQuestionDTO[],
  ): Promise<ExamQuestion[]> {
    const exam = this.ormRepository.create(examData);

    await this.ormRepository.save(exam);

    return exam;
  }

  public async findByCourse(course_id: string): Promise<ExamQuestion[]> {
    const exam = await this.ormRepository.find({ where: { course_id } });

    return exam;
  }

  public async update(data: ExamQuestion[]): Promise<ExamQuestion[]> {
    // const exam = this.ormRepository.merge(data);

    const exam = await this.ormRepository.save(data);

    return exam;
  }
}
