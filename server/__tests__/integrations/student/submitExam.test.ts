import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../../src/app";
import Admin from "../../../src/app/models/Admin";
import ExamQuestion from "../../../src/app/models/ExamQuestion";
import {
  initializeConnection,
  truncateAll,
  closeConnection,
} from "../../util/connectionDB";

describe("admin/Exam", () => {
  let user_id: string;
  let tokenAdmin: string;
  let tokenUser: string;
  let course_id: string;

  beforeAll(async () => {
    await initializeConnection();
  });

  beforeEach(async () => {
    await truncateAll();

    const adminsRepository = getRepository(Admin);

    const admin = adminsRepository.create({
      cpf: "1234567118126",
      password: "$2y$08$jiZkI9VpeNI15NfgXSzmFOOvKsb8jBni8DUPuCLHa/kkcTXZnneHm",
    });

    await adminsRepository.save(admin);

    const sessionAdminResponse = await request(app)
      .post("/sessions/admins")
      .send({
        cpf: admin.cpf,
        password: "123",
      });

    tokenAdmin = sessionAdminResponse.body.token;

    const user = {
      name: "Matheus Menezes",
      cpf: "1234567825368126",
      rg: "1230254",
      phone: "001234567854",
      password: "123",
    };

    const location = {
      countryCode: "BR",
      regionName: "Goias",
      city: "Jatai",
      query: "168.228.184.217",
    };

    const course = {
      name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
      category: "N10",
      modality: "Formação",
      workload: 8,
      value: 12000,
      description:
        "Instruir, orientar e capacitar trabalhadores em geral, que lidam com formas de energias perigosas, de forma a garantir a segurança dos funcionários, contratados e subcontratados, protegendo-os contra energização inesperada, ligações ou fuga das energias residuais durante a realização de serviços.",
      target_audience:
        "Trabalhadores em geral que executam serviços em com formas de energias perigosas e/ou que realizam serviços ou manutenção nos equipamentos  nergizados, tais como: instalação, construção, inspeção, limpeza, lubrificação, reparos, montagem e ajustes.",
      thumbnail:
        "https://www.portaldoseguro.com.br/wp-content/uploads/2019/03/homem-jovem-intrigado-segurando-a-testa-enquanto-se-sente-stress_1262-18026.jpg",
      course_expiration: 16,
      certificate_validity: 12,
      approved_by: "Matheus Menezes - CRA 123255",
      illustrative_video: "https://www.youtube.com/watch?v=jKzNQwF1oHU&t=1086s",
      learns: ["Ambiente de trabalho"],
      modules: [
        {
          name: "Introdução",
          description: "lalalala",
          file: "123easdasdas-indro",
        },
      ],
    };

    const userResponse = await request(app).post("/users").send(user);
    user_id = userResponse.body.id;

    const { cpf, password } = user;

    const sessionUserResponse = await request(app)
      .post("/sessions")
      .send({
        cpf,
        password,
        ...location,
      });

    tokenUser = sessionUserResponse.body.token;

    const responseCourse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    course_id = responseCourse.body.id;
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("should be able to view a exam to a course", async () => {
    const exam = {
      course_id,
      questions: [
        {
          title: "Primeira questão",
          answer_a: "Resposta a",
          answer_b: "Resposta b",
          answer_c: "Resposta c",
          answer_d: "Resposta d",
          correct_answer: "answer_c",
        },
        {
          title: "Segunda questão",
          answer_a: "Resposta a",
          answer_b: "Resposta b",
          answer_c: "Resposta c",
          answer_d: "Resposta d",
          correct_answer: "answer_a",
        },
        {
          title: "Terceira questão",
          answer_a: "Resposta a",
          answer_b: "Resposta b",
          answer_c: "Resposta c",
          answer_d: "Resposta d",
          correct_answer: "answer_b",
        },
      ] as ExamQuestion[],
    };

    const examResponse = await request(app)
      .post("/exams")
      .send(exam)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    await request(app)
      .post("/user-courses/")
      .send({ user_id, course_id })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const response = await request(app)
      .get(`/users/courses/${course_id}/exams`)
      .set("Authorization", `Bearer ${tokenUser}`);

    const examFormatted = examResponse.body.map((question: any) => ({
      id: question.id,
      title: question.title,
      answer_a: question.answer_a,
      answer_b: question.answer_b,
      answer_c: question.answer_c,
      answer_d: question.answer_d,
    }));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name:
        "Prova de Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
      questions: examFormatted,
    });
  });

  it("should not be able to view a exam to a course with ser not have", async () => {
    const response = await request(app)
      .get(`/users/courses/${course_id}/exams`)
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  // it("should be able to show a course exam", async () => {
  //   const exam = {
  //     course_id,
  //     questions: [
  //       {
  //         title: "Primeira questão",
  //         answer_a: "Resposta a",
  //         answer_b: "Resposta b",
  //         answer_c: "Resposta c",
  //         answer_d: "Resposta d",
  //         correct_answer: "answer_c",
  //       },
  //       {
  //         title: "Segunda questão",
  //         answer_a: "Resposta a",
  //         answer_b: "Resposta b",
  //         answer_c: "Resposta c",
  //         answer_d: "Resposta d",
  //         correct_answer: "answer_a",
  //       },
  //       {
  //         title: "Terceira questão",
  //         answer_a: "Resposta a",
  //         answer_b: "Resposta b",
  //         answer_c: "Resposta c",
  //         answer_d: "Resposta d",
  //         correct_answer: "answer_b",
  //       },
  //     ] as ExamQuestion[],
  //   };

  //   await request(app)
  //     .post("/exams")
  //     .send(exam)
  //     .set("Authorization", `Bearer ${token}`);

  //   const response = await request(app)
  //     .get(`/courses/${course_id}/exams`)
  //     .set("Authorization", `Bearer ${token}`);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(
  //     expect.arrayContaining(
  //       exam.questions.map(question => expect.objectContaining(question)),
  //     ),
  //   );
  // });
});
