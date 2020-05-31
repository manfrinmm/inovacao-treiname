import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../src/app";
import ExamQuestion from "../../src/app/models/ExamQuestion";
import {
  initializeConnection,
  truncateAll,
  closeConnection,
} from "../util/connectionDB";

describe("Exam", () => {
  let user;
  let token: string;

  beforeAll(async () => {
    await initializeConnection();
  });

  beforeEach(async () => {
    await truncateAll();

    user = {
      name: "Matheus Menezes",
      cpf: "1234567825368126",
      rg: "1230254",
      phone: "001234567854",
      password: "123",
    };

    const userResponse = await request(app).post("/users").send(user);

    const { cpf } = userResponse.body;
    const { password } = user;

    const response = await request(app).post("/sessions").send({
      cpf,
      password,
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("should be able to create a new exam to a course", async () => {
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
      learns: [
        "Ambiente de trabalho",
        "Acidentes e Doenças do Trabalho",
        "Energia Elétrica",
        "Equipamentos Instalados em Linhas de Transmissão",
        "Dados Estatísticos",
      ],
      modules: [
        {
          name: "Introdução",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          file: "123easdasdas-indro",
        },
        {
          name: "Aplicação",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          extra_link:
            "https://gist.github.com/diego3g/5f23fb3f8f18fa9ec52669741cd156b3/revisions",
          file: "123easdasdas-indro",
        },
        {
          name: "Introdução33",
          description: "lalalala",
          file: "123easdasdas-indro",
        },
      ],
    };

    const courseResponse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${token}`);

    const course_id = courseResponse.body.id as string;

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

    const response = await request(app)
      .post("/exams")
      .send(exam)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.arrayContaining(
        exam.questions.map(question => expect.objectContaining(question)),
      ),
    );
  });

  it("should be able to show a course exam", async () => {
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
      learns: [
        "Ambiente de trabalho",
        "Acidentes e Doenças do Trabalho",
        "Energia Elétrica",
        "Equipamentos Instalados em Linhas de Transmissão",
        "Dados Estatísticos",
      ],
      modules: [
        {
          name: "Introdução",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          file: "123easdasdas-indro",
        },
        {
          name: "Aplicação",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          extra_link:
            "https://gist.github.com/diego3g/5f23fb3f8f18fa9ec52669741cd156b3/revisions",
          file: "123easdasdas-indro",
        },
        {
          name: "Introdução33",
          description: "lalalala",
          file: "123easdasdas-indro",
        },
      ],
    };

    const courseResponse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${token}`);

    const course_id = courseResponse.body.id as string;

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

    await request(app)
      .post("/exams")
      .send(exam)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/courses/${course_id}/exams`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining(
        exam.questions.map(question => expect.objectContaining(question)),
      ),
    );
  });

  it("should be able to delete a exam question", async () => {
    const examsRepository = getRepository(ExamQuestion);

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
      learns: [
        "Ambiente de trabalho",
        "Acidentes e Doenças do Trabalho",
        "Energia Elétrica",
        "Equipamentos Instalados em Linhas de Transmissão",
        "Dados Estatísticos",
      ],
      modules: [
        {
          name: "Introdução",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          file: "123easdasdas-indro",
        },
        {
          name: "Aplicação",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          extra_link:
            "https://gist.github.com/diego3g/5f23fb3f8f18fa9ec52669741cd156b3/revisions",
          file: "123easdasdas-indro",
        },
        {
          name: "Introdução33",
          description: "lalalala",
          file: "123easdasdas-indro",
        },
      ],
    };

    const createCourseResponse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${token}`);

    const course_id = createCourseResponse.body.id as string;

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

    const createExamResponse = await request(app)
      .post("/exams")
      .send(exam)
      .set("Authorization", `Bearer ${token}`);

    const examData = createExamResponse.body as ExamQuestion[];

    const question_id = examData[0].id;

    const response = await request(app)
      .delete(`/courses/${course_id}/exams/${question_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
    expect(await examsRepository.findOne(question_id)).toBe(undefined);
  });

  it("should be able to update a exam", async () => {
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
      learns: [
        "Ambiente de trabalho",
        "Acidentes e Doenças do Trabalho",
        "Energia Elétrica",
        "Equipamentos Instalados em Linhas de Transmissão",
        "Dados Estatísticos",
      ],
      modules: [
        {
          name: "Introdução",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          file: "123easdasdas-indro",
        },
        {
          name: "Aplicação",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          extra_link:
            "https://gist.github.com/diego3g/5f23fb3f8f18fa9ec52669741cd156b3/revisions",
          file: "123easdasdas-indro",
        },
        {
          name: "Introdução33",
          description: "lalalala",
          file: "123easdasdas-indro",
        },
      ],
    };

    const createCourseResponse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${token}`);

    const course_id = createCourseResponse.body.id as string;

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

    const createExamResponse = await request(app)
      .post("/exams")
      .send(exam)
      .set("Authorization", `Bearer ${token}`);

    const examData = createExamResponse.body as ExamQuestion[];

    examData[0].title = "Edit title primeira questão";
    examData[1].correct_answer = "answer_c";

    // Omit updated_at on edited information
    delete examData[0].updated_at;
    delete examData[1].updated_at;

    const examNewData = [
      ...examData,
      {
        course_id,
        title: "Quarta questão",
        answer_a: "Resposta a",
        answer_b: "Resposta b",
        answer_c: "Resposta c",
        answer_d: "Resposta d",
        correct_answer: "answer_d",
      },
    ];

    const response = await request(app)
      .put(`/courses/${course_id}/exams`)
      .send(examNewData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining(
        examNewData.map(question => expect.objectContaining(question)),
      ),
    );
  });
});
