import { classToClass } from "class-transformer";

import AppError from "../../errors/AppError";
import UserCourses from "../../models/UserCourses";
import SubmitExamsRepository from "../../repositories/SubmitExamsRepository";
import UserCoursesRepository from "../../repositories/UserCoursesRepository";
import ShowUserCourseByUserIdAndCourseIdService from "../ShowUserCourseByUserIdAndCourseIdService";

interface Request {
  course_id: string;
  user_id: string;
}

interface ShowExamStatusResponse {
  accuracy: number | undefined;
  userCourse: UserCourses;
  practical_exam_url: string | undefined;
}

export default class ShowExamStatus {
  public async execute({
    user_id,
    course_id,
  }: Request): Promise<ShowExamStatusResponse> {
    const submitExamsRepository = new SubmitExamsRepository();
    const showUserCourseByUserIdAndCourseId = new ShowUserCourseByUserIdAndCourseIdService();

    const userCourse = await showUserCourseByUserIdAndCourseId.execute({
      course_id,
      user_id,
    });

    const { exam_submit_id } = userCourse;

    let accuracy;
    let practical_exam_url;

    if (exam_submit_id) {
      const exam = await submitExamsRepository.findOne(exam_submit_id);

      accuracy = exam?.accuracy;
      practical_exam_url = classToClass(userCourse.course).practical_exam_url;
    }

    return { userCourse, accuracy, practical_exam_url };

    // const examResult = await submitExamsRepository.findOne(submit_id);

    // if (!examResult) {
    //   throw new AppError("Exam result not found");
    // }
    // let accuracy = 0;

    // examResult.questions.forEach(question => {
    //   if (question.correct_answer === question.answer_mark) {
    //     accuracy += 1 / examResult.questions.length;
    //   }
    // });

    // if (accuracy >= 0.7) {
    //   return { examResult, accuracy };
    // }

    // return { accuracy };
  }
}
