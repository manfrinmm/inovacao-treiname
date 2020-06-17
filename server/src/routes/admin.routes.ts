import { Router } from "express";

import ReportController from "../app/controllers/Admin/ReportController";

const routes = Router();

routes.get("/reports", ReportController.index);

export default routes;
