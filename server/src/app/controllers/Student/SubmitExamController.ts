import { Request, Response } from "express";

import UserCoursesRepository from "../../repositories/UserCoursesRepository";
import CreateSubmitExamService from "../../services/CreateSubmitExamService";
import ShowExamService from "../../services/ShowExamService";

class SubmitExamController {
  async store(req: Request, res: Response): Promise<Response> {
    const showExam = new ShowExamService();
    const createSubmitExam = new CreateSubmitExamService();
    const userCoursesRepository = new UserCoursesRepository();

    const { course_id, questions } = req.body;
    const user_id = req.user.id;

    const exam = await showExam.execute(course_id);
    const examFormatted = exam.map((question, index) => ({
      ...question,
      ...questions[index],
    }));

    const SubmitExam = await createSubmitExam.execute({
      course_id,
      user_id,
      questions: examFormatted,
    });

    const exam_submit_id = String(SubmitExam.id);

    const userCourses = await userCoursesRepository.findAllByUser(user_id);

    const userCourse = userCourses.find(
      userCourseItem => userCourseItem.course_id === course_id,
    );
    if (!userCourse) {
      return res.status(400).json({ message: "User course not found" });
    }

    userCourse.exam_submit_id = exam_submit_id;

    await userCoursesRepository.update(userCourse);

    // call Job for calculate Exam Result && accuracy > 0.7, generate certification.

    return res.status(201).json(SubmitExam);
  }

  // async show(req: Request, res: Response): Promise<Response> {
  //   const createExam = new ShowExamService();

  //   const { course_id } = req.params;

  //   const exam = await createExam.execute(course_id);

  //   return res.status(200).json(exam);
  // }

  // async update(req: Request, res: Response): Promise<Response> {
  //   const updateExam = new UpdateExamService();

  //   const { course_id } = req.params;
  //   const data = req.body;

  //   const exam = await updateExam.execute({ course_id, data });

  //   return res.status(200).json(exam);
  // }

  // async destroy(req: Request, res: Response): Promise<Response> {
  //   const deleteQuestion = new DeleteQuestionService();

  //   const { question_id } = req.params;

  //   await deleteQuestion.execute(question_id);

  //   return res.status(204).json();
  // }
}

export default new SubmitExamController();
