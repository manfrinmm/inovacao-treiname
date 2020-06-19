import { Router } from "express";

import CertificationController from "../app/controllers/Admin/CertificationController";
import ExamResultController from "../app/controllers/Admin/ExamResultController";
import ReportController from "../app/controllers/Admin/ReportController";
import UpdateAdminController from "../app/controllers/Admin/UpdateAdminController";

const routes = Router();

routes.get("/reports", ReportController.index);

routes.get("/exams/:exam_submit_id/result", ExamResultController.show);

routes.post("/certifications", CertificationController.store);

routes.put("/update", UpdateAdminController.update);

export default routes;
