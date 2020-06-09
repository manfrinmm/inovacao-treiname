import express, { Router } from "express";

import multer from "multer";

import CourseController from "./app/controllers/CourseController";
import ExamController from "./app/controllers/ExamController";
import FileController from "./app/controllers/FileController";
import ModuleController from "./app/controllers/ModuleController";
import SessionAdminController from "./app/controllers/SessionAdminController";
import SessionController from "./app/controllers/SessionController";
import UserController from "./app/controllers/UserController";
import UserCoursesController from "./app/controllers/UserCoursesController";
import Authenticate from "./app/middlewares/Authenticate";
import uploadConfig from "./config/multer";

const upload = multer(uploadConfig.multer);

const routes = Router();
routes.use("/files", express.static(uploadConfig.tmpFolder));

routes.post("/sessions", SessionController.store);
routes.post("/sessions/admins", SessionAdminController.store);

routes.post("/users", UserController.store);

routes.get("/courses", CourseController.index);
routes.get("/courses/:course_id", CourseController.show);

routes.use(Authenticate);

routes.get("/users", UserController.index);
routes.get("/users/:user_id", UserController.show);
routes.put("/users/:user_id", UserController.update);

routes.post("/file", upload.single("file"), FileController.store);

routes.post("/courses", CourseController.store);
routes.put("/courses/:course_id", CourseController.update);
routes.delete("/courses/:course_id", CourseController.destroy);

routes.delete("/modules/:module_id", ModuleController.destroy);

routes.post("/exams", ExamController.store);
routes.get("/courses/:course_id/exams", ExamController.show);
routes.put("/courses/:course_id/exams", ExamController.update);
routes.delete("/courses/:course_id/exams/:question_id", ExamController.destroy);

routes.post("/user-courses", UserCoursesController.store);

export default routes;
