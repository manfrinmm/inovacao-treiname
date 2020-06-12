import { Router } from "express";

import CourseController from "../app/controllers/Student/CourseController";
import DashboardController from "../app/controllers/Student/DashboardController";
import ExamController from "../app/controllers/Student/ExamController";
import ResultExamController from "../app/controllers/Student/ResultExamController";
import ShowExamStatusController from "../app/controllers/Student/ShowExamStatusController";
import SubmitExamController from "../app/controllers/Student/SubmitExamController";

const routes = Router();

routes.get("/dashboard", DashboardController.index);
routes.get("/courses/:course_id", CourseController.show);
routes.get("/courses/:course_id/exams", ExamController.show);
routes.post("/exams/submit", SubmitExamController.store);
routes.get("/exams/:submit_id/result", ResultExamController.show);
routes.get("/exams/:course_id/status", ShowExamStatusController.show);

export default routes;
