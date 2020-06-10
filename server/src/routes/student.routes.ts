import { Router } from "express";

import CourseController from "../app/controllers/Student/CourseController";
import DashboardController from "../app/controllers/Student/DashboardController";

const routes = Router();

routes.get("/dashboard", DashboardController.index);
routes.get("/courses/:course_id", CourseController.show);
routes.get("/courses/:course_id/exam");

export default routes;
