import express, { Router } from "express";

import multer from "multer";
import path from "path";

import CertificationController from "../app/controllers/CertificationController";
import CourseController from "../app/controllers/CourseController";
import ExamController from "../app/controllers/ExamController";
import FileController from "../app/controllers/FileController";
import ModuleController from "../app/controllers/ModuleController";
import SessionAdminController from "../app/controllers/SessionAdminController";
import SessionController from "../app/controllers/SessionController";
import UserController from "../app/controllers/UserController";
import UserCoursesController from "../app/controllers/UserCoursesController";
import Authenticate from "../app/middlewares/Authenticate";
import CreateCertificationService from "../app/services/CreateCertificationService";
import uploadConfig from "../config/multer";
import adminRoutes from "./admin.routes";
import studentRoutes from "./student.routes";

const upload = multer(uploadConfig.multer);

const routes = Router();
routes.use("/files", express.static(uploadConfig.tmpFolder));

const viewsPath = path.resolve(__dirname, "..", "app", "views");
routes.use(express.static(viewsPath));

routes.get("/pdf", async (req, res) => {
  const createCertification = new CreateCertificationService();

  const data = {
    name: "Matheus Menezes Manfrin aaa",
    rg: "25.654.698",
    course: {
      name: "SEGURANÇA EM INSTALAÇÕES E SERVIÇOS COM ELETRICIDADE",
      workload: 8,
      category: "NR-10",
      approved_by: "mathesssss",
      learns: [
        "10. Documentação de instalações elétricas.",
        "11. Riscos adicionais:",
        "a) altura;",
        "b) ambientes confinados;",
        "c) áreas classificadas; umidade; e condições atmosféricas.",
        "12. Proteção e combate a incêndios:",
        "a) noções básicas;",
        "b) medidas preventivas;",
        "c) métodos de extinção; e prática;",
        "13. Acidentes de origem elétrica:",
        "a) causas diretas e indiretas; e discussão de casos;",
        "14. Primeiros socorros:",
        "a) noções sobre lesões;",
        "b) priorização do atendimento;",
        "c) aplicação de respiração artificial;",
        "d) massagem cardíaca;",
        "e) técnicas para remoção e transporte de acidentados; e práticas.",
        "15. Responsabilidade",
      ],
    },
  };

  const pdfName = await createCertification.execute(data);

  const pdfPath = path.resolve(
    uploadConfig.tmpFolder,
    "certifications",
    pdfName,
  );

  return res.sendFile(pdfPath);
});

routes.get("/certification/:id", CertificationController.show);

routes.post("/sessions", SessionController.store);
routes.post("/sessions/admins", SessionAdminController.store);

routes.post("/users", UserController.store);

routes.get("/courses", CourseController.index);
routes.get("/courses/:course_id", CourseController.show);

routes.use(Authenticate);

routes.use("/users", studentRoutes);
routes.use("/admins", adminRoutes);

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
