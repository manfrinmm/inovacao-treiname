import { Router } from "express";

import UserController from "./app/controllers/UserController";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("ok");
});

routes.post("/users", UserController.store);

export default routes;
