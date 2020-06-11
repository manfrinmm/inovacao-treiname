import { Router } from "express";

import CourseController from "../app/controllers/Student/CourseController";
import DashboardController from "../app/controllers/Student/DashboardController";
import ExamController from "../app/controllers/Student/ExamController";
import SubmitExamController from "../app/controllers/Student/SubmitExamController";

const routes = Router();

routes.get("/dashboard", DashboardController.index);
routes.get("/courses/:course_id", CourseController.show);
routes.get("/courses/:course_id/exams", ExamController.show);
routes.post("/exams/submit", SubmitExamController.store);

export default routes;
