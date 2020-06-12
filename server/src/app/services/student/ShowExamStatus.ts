import AppError from "../../errors/AppError";
import UserCourses from "../../models/UserCourses";
import SubmitExamsRepository from "../../repositories/SubmitExamsRepository";
import UserCoursesRepository from "../../repositories/UserCoursesRepository";

interface Request {
  course_id: string;
  user_id: string;
}

export default class ShowExamStatus {
  public async execute({ user_id, course_id }: Request): Promise<UserCourses> {
    // const submitExamsRepository = new SubmitExamsRepository();
    const userCoursesRepository = new UserCoursesRepository();

    const userCourses = await userCoursesRepository.findAllByUser(user_id);

    const userCourse = userCourses.find(
      userCourseItem => userCourseItem.course_id === course_id,
    );

    if (!userCourse) {
      throw new AppError("User course not found");
    }

    return userCourse;
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
