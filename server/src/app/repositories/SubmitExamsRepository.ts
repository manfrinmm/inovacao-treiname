import { getMongoRepository, MongoRepository } from "typeorm";

import SubmitExam from "../models/schemas/SubmitExam";

interface QuestionProps {
  title: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: string;
  answer_mark: string;
}

interface CreateSubmitExamDTO {
  course_id: string;
  user_id: string;
  questions: Array<QuestionProps>;
}

export default class UsersRepository {
  private ormRepository: MongoRepository<SubmitExam>;

  constructor() {
    this.ormRepository = getMongoRepository(SubmitExam, "mongo");
  }

  public async findAll(): Promise<SubmitExam[]> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async create(data: CreateSubmitExamDTO): Promise<SubmitExam> {
    const submitExam = this.ormRepository.create(data);

    await this.ormRepository.save(submitExam);

    return submitExam;
  }

  public async findByUserId(user_id: string): Promise<SubmitExam | undefined> {
    const submitExam = await this.ormRepository.findOne({ user_id });

    return submitExam;
  }

  public async findByCourseId(
    course_id: string,
  ): Promise<SubmitExam | undefined> {
    const user = await this.ormRepository.findOne({ course_id });

    return user;
  }

  public async findOne(user_id: string): Promise<SubmitExam | undefined> {
    const user = await this.ormRepository.findOne(user_id, {
      relations: ["courses", "courses.course", "logs"],
    });

    return user;
  }
}
