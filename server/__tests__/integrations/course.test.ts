import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../src/app";
import Course from "../../src/app/models/Course";
import {
  initializeConnection,
  truncateAll,
  closeConnection,
} from "../util/connectionDB";

describe("Course", () => {
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

  it("should be able to create a new course", async () => {
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

    const response = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...course,
        modules: expect.arrayContaining(
          course.modules.map(module => expect.objectContaining(module)),
        ),
      }),
    );
  });

  it("should be able to show a course", async () => {
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

    const course_id = courseResponse.body.id;

    const response = await request(app)
      .get(`/courses/${course_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...course,
        modules: expect.arrayContaining(
          course.modules.map(module => expect.objectContaining(module)),
        ),
      }),
    );
  });

  it("should be able to list all courses", async () => {
    const course1 = {
      name: "Title course 1",
      category: "N10",
      modality: "Formação",
      workload: 80,
      value: 12900,
      description: "Description course 1",
      target_audience: "TTeste teste reparos, montagem e ajustes.",
      thumbnail:
        "https://www.portaldoseguro.com.br/wp-content/uploads/2019/03/homem-jovem-intrigado-segurando-a-testa-enquanto-se-sente-stress_1262-18026.jpg",
      course_expiration: 160,
      certificate_validity: 6,
      approved_by: "Fabio - CRA 123255",
      illustrative_video: "",
      learns: ["First learn", "Second learn", "Third learn"],
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
          name: "Introdução",
          description: "lalalala",
          file: "123easdasdas-indro",
        },
      ],
    };

    const course2 = {
      name: "Curso de Energias Perigosas",
      category: "N10",
      modality: "Formação",
      workload: 45,
      value: 365256,
      description:
        "Instruir, orien com formas de energias perigosas, de forma a garantir a segurança dos funcionários, contratados e subcontratados, protegendo-os contra energização inesperada, ligações ou fuga das energias residuais durante a realização de serviços.",
      target_audience:
        "Trabalhadores em geral que executam serviços em com formas de energias perigosas e/ou que realizam serviços ou manutenção nos equipamentos  nergizados, tais como: instalação, letrução, inspeção, limpeza, lubrificação, reparos, montagem e ajustes.",
      thumbnail:
        "https://www.portaldoseguro.com.br/wp-content/uploads/2019/03/homem-jovem-intrigado-segurando-a-testa-enquanto-se-sente-stress_1262-18026.jpg",
      course_expiration: 16,
      certificate_validity: 12,
      approved_by: "Fabio - CRA 123255",
      illustrative_video: "https://www.youtube.com/watch?v=jKzNQwF1oHU&t=1086s",
      learns: ["First learn", "Second learn", "Third learn"],
      modules: [
        {
          name: "Introdução",
          description: "TEste",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          file: "123easdasdas-indro",
        },
      ],
    };

    const course3 = {
      name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
      category: "N10",
      modality: "Formação",
      workload: 8,
      value: 12000,
      description: "Description",
      target_audience: "Tab",
      thumbnail:
        "https://www.portaldoseguro.com.br/wp-content/uploads/2019/03/homem-jovem-intrigado-segurando-a-testa-enquanto-se-sente-stress_1262-18026.jpg",
      course_expiration: 16,
      certificate_validity: 12,
      approved_by: "Matheus Menezes - CRA 123255",
      illustrative_video: "https://www.youtube.com/watch?v=jKzNQwF1oHU&t=1086s",
      learns: ["First learn"],
      modules: [
        {
          name: "Introdução",
          description: "TEste",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          file: "123easdasdas-indro",
        },
      ],
    };

    const response1 = request(app)
      .post("/courses")
      .send(course1)
      .set("Authorization", `Bearer ${token}`);
    const response2 = request(app)
      .post("/courses")
      .send(course2)
      .set("Authorization", `Bearer ${token}`);
    const response3 = request(app)
      .post("/courses")
      .send(course3)
      .set("Authorization", `Bearer ${token}`);

    await Promise.all([response1, response2, response3]);

    const response = await request(app)
      .get("/courses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...course1,
          modules: expect.arrayContaining(
            course1.modules.map(module => expect.objectContaining(module)),
          ),
        }),
        expect.objectContaining({
          ...course2,
          modules: expect.arrayContaining(
            course2.modules.map(module => expect.objectContaining(module)),
          ),
        }),
        expect.objectContaining({
          ...course3,
          modules: expect.arrayContaining(
            course3.modules.map(module => expect.objectContaining(module)),
          ),
        }),
      ]),
    );
  });

  it("should be able to update a course", async () => {
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
    } as Course;

    const courseResponse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${token}`);

    const courseData = courseResponse.body as Course;

    courseData.name = "Edit title name";
    courseData.modules[0].name = "Edit name of module";

    // Omit updated_at on edited information
    delete courseData.modules[0].updated_at;
    delete courseData.updated_at;

    const courseNewData = {
      ...courseData,
      modules: [
        ...courseData.modules,
        {
          name: "New module",
          description: "New module Description",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          file: "New module-indro",
        },
      ],
    };

    const response = await request(app)
      .put(`/courses/${courseData.id}`)
      .send(courseNewData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...courseNewData,
        modules: expect.arrayContaining(
          courseNewData.modules.map(module => expect.objectContaining(module)),
        ),
      }),
    );
  });

  it("should be able to delete a course", async () => {
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

    const courseRepository = getRepository(Course);

    const courseResponse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${token}`);

    const course_id = courseResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/courses/${course_id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/courses/${course_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);
    expect(response.status).toBe(404);
    expect(await courseRepository.findOne(course_id)).toBe(undefined);
  });

  it("should not be able to delete a course not-existing", async () => {
    const deleteResponse = await request(app)
      .delete("/courses/f7192341-1389-41c2-9319-7804a25ae54a")
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(404);
  });
});
