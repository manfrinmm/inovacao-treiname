import { getRepository } from "typeorm";

import UserCourses from "../../models/UserCourses";
import ListAllCoursesService from "../ListAllCoursesService";

interface GenerateReportResponse {
  course: {
    id: string;
    name: string;
    approved_by: string;
    total_value: number;
  };
}

interface ReportProp {
  name: string;
  approved_by: string;
  category: string;
  modality: string;
  value: number;
  total_value: number;
  total_sales: number;
}

export default class GenerateReportService {
  public async execute(): Promise<ReportProp[]> {
    const userCoursesRepository = getRepository(UserCourses);
    const listAllCourses = new ListAllCoursesService();

    const report: ReportProp[] = [];

    const courses = await listAllCourses.execute();
    const userCourses = await userCoursesRepository.find({
      relations: ["course"],
    });

    function getAllOccurrencesInUserCourses(value: string): number {
      let occurrences = 0;

      userCourses.forEach(userCourse => {
        if (userCourse.course_id.includes(value)) {
          occurrences++;
        }
      });

      return occurrences;
    }

    courses.forEach(course => {
      const total_sales = getAllOccurrencesInUserCourses(course.id);

      report.push({
        name: course.name,
        approved_by: course.approved_by,
        category: course.category,
        modality: course.modality,
        value: course.value,
        total_value: course.value * total_sales,
        total_sales,
      });
    });

    return report;
  }
}
