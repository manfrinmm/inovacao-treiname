import { Request, Response } from "express";

import Queue from "../../../libs/Queue";
import ExamCorrection from "../../jobs/ExamCorrection";
import UserCoursesRepository from "../../repositories/UserCoursesRepository";
import ShowExamService from "../../services/ShowExamService";
import ShowUserCourseByUserIdAndCourseIdService from "../../services/ShowUserCourseByUserIdAndCourseIdService";
import CreateSubmitExamService from "../../services/student/CreateSubmitExamService";

class SubmitExamController {
  async store(req: Request, res: Response): Promise<Response> {
    const showExam = new ShowExamService();
    const createSubmitExam = new CreateSubmitExamService();
    const userCoursesRepository = new UserCoursesRepository();
    const showUserCourseByUserIdAndCourseId = new ShowUserCourseByUserIdAndCourseIdService();

    const { course_id, questions } = req.body;
    const user_id = req.user.id;

    const exam = await showExam.execute(course_id);
    const examQuestionsFormatted = exam.map((question, index) => ({
      ...question,
      answer_mark: questions[index].answer_mark,
    }));

    const SubmitExam = await createSubmitExam.execute({
      course_id,
      user_id,
      questions: examQuestionsFormatted,
    });

    const exam_submit_id = String(SubmitExam.id);

    const userCourse = await showUserCourseByUserIdAndCourseId.execute({
      course_id,
      user_id,
    });
    userCourse.exam_submit_id = exam_submit_id;
    await userCoursesRepository.update(userCourse);

    // call Job for calculate Exam Result && accuracy > 0.7, generate certification.
    console.log(`calling job: ${ExamCorrection.key}`);
    await Queue.add(ExamCorrection.key, {
      submit_id: exam_submit_id,
    });

    return res.status(201).json(SubmitExam);
  }
}

export default new SubmitExamController();
