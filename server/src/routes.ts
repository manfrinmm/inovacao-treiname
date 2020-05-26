import { Router } from "express";

import CourseController from "./app/controllers/CourseController";
import UserController from "./app/controllers/UserController";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("ok");
});

routes.post("/users", UserController.store);

routes.get("/courses", CourseController.index);
routes.post("/courses", CourseController.store);

export default routes;
