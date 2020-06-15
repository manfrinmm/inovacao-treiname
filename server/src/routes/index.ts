import express, { Router } from "express";

import multer from "multer";

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
import studentRoutes from "./student.routes";

const upload = multer(uploadConfig.multer);

const routes = Router();
routes.use("/files", express.static(uploadConfig.tmpFolder));
routes.get("/pdf", async (req, res) => {
  const createCertification = new CreateCertificationService();

  const data = {
    name: "Matheus Menezes Manfrin",
    rg: "25.654.698",
    course: {
      name: "SEGURANÇA EM INSTALAÇÕES E SERVIÇOS COM ELETRICIDADE",
      workload: 8,
      category: "NR-10",
      learns: ["nada", "nada", "nada", "nada"],
    },
  };

  await createCertification.execute(data);
  return res.json("ok");
});
// routes.use("/pdf", (req, res) => {
//   const pdf = new Pdfkit({ layout: "landscape", margin: 32 });

//   pdf
//     .image(resolve(__dirname, "logo.png"), {
//       width: 200,
//     })
//     .moveDown(2);

//   pdf
//     .fillColor("#ff9000")
//     .fontSize(36)
//     .text("Certificado", {
//       align: "center",
//     })
//     .moveDown(1);

//   pdf
//     .fillColor("#000")
//     .fontSize(16)
//     .text(
//       "Certificamos que LEONEL ALVES DA SILVA, portador do RG: 5.444.358" +
//         " SPTC/GO concluiu com aproveitamento o curso de NR-10 Básico - Segurança" +
//         " em Instalações e Serviços com Eletricidade, de 13 a 17 de Janeiro de" +
//         " 2020, com carga horária de 40 horas,de acordo com a NR-10.",
//       {
//         align: "center",
//       },
//     )
//     .font("Times-Roman", "13")
//     .moveDown(3);

//   pdf.text("Jatai - GO, 17 de Janeiro de 2020", {
//     align: "right",
//   });

//   pdf
//     .image(resolve(__dirname, "logo.png"), 72, 355, {
//       width: 200,
//     })
//     .text("Ass. Estudante", 72, 355)
//     .moveDown(2);

//   pdf
//     .image(resolve(__dirname, "sup.jpeg"), 450, 355, {
//       width: 200,
//       height: 80,
//     })
//     .text("Ass. Sup", 450, 355)
//     .moveDown(2);

//   pdf.end();

//   return pdf.pipe(res);
// });

routes.post("/sessions", SessionController.store);
routes.post("/sessions/admins", SessionAdminController.store);

routes.post("/users", UserController.store);

routes.get("/courses", CourseController.index);
routes.get("/courses/:course_id", CourseController.show);

routes.use(Authenticate);

routes.use("/users", studentRoutes);

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
