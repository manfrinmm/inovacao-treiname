import AppError from "../../errors/AppError";
import SubmitExam from "../../models/schemas/SubmitExam";
import SubmitExamsRepository from "../../repositories/SubmitExamsRepository";

export default class ShowSubmitExamService {
  public async execute(submit_id: string): Promise<SubmitExam> {
    const submitExamsRepository = new SubmitExamsRepository();
    const submitExam = await submitExamsRepository.findOne(submit_id);

    if (!submitExam) {
      throw new AppError("Submit exam not found");
    }

    return submitExam;
  }
}
