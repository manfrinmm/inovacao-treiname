import UserCoursesRepository from "../repositories/UserCoursesRepository";
import CreateCertificationService from "../services/CreateCertificationService";
import ShowCourseService from "../services/ShowCourseService";
import ShowUserCourseByUserIdAndCourseIdService from "../services/ShowUserCourseByUserIdAndCourseIdService";
import ShowUserService from "../services/ShowUserService";

class GenerateCertification {
  get key() {
    return "GenerateCertification";
  }

  async handle({ data }: any) {
    const userCoursesRepository = new UserCoursesRepository();

    const createCertification = new CreateCertificationService();
    const showUserCourseByUserIdAndCourseId = new ShowUserCourseByUserIdAndCourseIdService();
    const showUser = new ShowUserService();
    const showCourse = new ShowCourseService();

    const { course_id, user_id } = data;

    const user = await showUser.execute(user_id);
    const course = await showCourse.execute(course_id);

    const userCourse = await showUserCourseByUserIdAndCourseId.execute({
      course_id,
      user_id,
    });

    const certification = await createCertification.execute({
      course,
      name: user.name,
      rg: user.rg,
      released_on: userCourse.created_at,
    });

    userCourse.certification = certification;
    await userCoursesRepository.update(userCourse);

    console.log(`Executed job: GenerateCertification`);
  }
}

export default new GenerateCertification();
