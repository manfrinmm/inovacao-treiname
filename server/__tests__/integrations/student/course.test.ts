import { differenceInDays, parseISO, subHours } from "date-fns";
import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../../src/app";
import Admin from "../../../src/app/models/Admin";
import UserCourses from "../../../src/app/models/UserCourses";
import {
  initializeConnection,
  truncateAll,
  closeConnection,
} from "../../util/connectionDB";

describe("student/Course", () => {
  let user_id: string;
  let tokenAdmin: string;
  let tokenUser: string;

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

    const userResponse = await request(app).post("/users").send(user);
    user_id = userResponse.body.id;

    const { cpf, password } = user;

    const location = {
      countryCode: "BR",
      regionName: "Goias",
      city: "Jatai",
      query: "168.228.184.217",
    };

    const sessionUserResponse = await request(app)
      .post("/sessions")
      .send({
        cpf,
        password,
        ...location,
      });

    tokenUser = sessionUserResponse.body.token;
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("should be able to show all courses of a user", async () => {
    const course1 = {
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

    const course2 = {
      name: "22Curso Bloqueio e 22",
      category: "N10",
      modality: "Reciclagem",
      workload: 80,
      value: 12000,
      description:
        "Instruir, orientar e capacitar trabalhadores em geral, que lidam com formas de energias perigosas, de forma a garantir a segurança dos funcionários, contratados e subcontratados, protegendo-os contra energização inesperada, ligações ou fuga das energias residuais durante a realização de serviços.",
      target_audience:
        "Trabalhadores em geral que executam serviços em com formas de energias perigosas e/ou que realizam serviços ou manutenção nos equipamentos  nergizados, tais como: instalação, construção, inspeção, limpeza, lubrificação, reparos, montagem e ajustes.",
      thumbnail:
        "https://www.portaldoseguro.com.br/wp-content/uploads/2019/03/homem-jovem-intrigado-segurando-a-testa-enquanto-se-sente-stress_1262-18026.jpg",
      course_expiration: 6,
      certificate_validity: 12,
      approved_by: "Matheus Menezes - CRA 123255",
      illustrative_video: "https://www.youtube.com/watch?v=jKzNQwF1oHU&t=1086s",
      learns: ["Ambiente de trabalho"],
      modules: [
        {
          name: "Introdução",
          description: "lalalala",
          video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
          file: "123easdasdas-indro",
        },
      ],
    };

    const courseResponse1 = await request(app)
      .post("/courses")
      .send(course1)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const course_id1 = courseResponse1.body.id;

    const courseResponse2 = await request(app)
      .post("/courses")
      .send(course2)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const course_id2 = courseResponse2.body.id;

    await request(app)
      .post("/user-courses/")
      .send({ user_id, course_id: course_id1 })
      .set("Authorization", `Bearer ${tokenAdmin}`);
    await request(app)
      .post("/user-courses/")
      .send({ user_id, course_id: course_id2 })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const response = await request(app)
      .get("/users/dashboard")
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: course_id1,
          status: null,
        }),
        expect.objectContaining({
          id: course_id2,
          status: null,
        }),
      ]),
    );
  });

  it("should be able to show a courses of a user", async () => {
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
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const course_id = courseResponse.body.id;

    const userCoursesResponse = await request(app)
      .post("/user-courses/")
      .send({ user_id, course_id })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const days_remaining = differenceInDays(
      parseISO(userCoursesResponse.body.expires_in),
      new Date(),
    );

    const response = await request(app)
      .get(`/users/courses/${course_id}`)
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...course,
        modules: expect.arrayContaining(
          course.modules.map(module => expect.objectContaining(module)),
        ),
        days_remaining,
      }),
    );
  });

  it("should not be able to show a courses of a user after expires", async () => {
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

    const userCoursesRepository = getRepository(UserCourses);

    const courseResponse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const course_id = courseResponse.body.id;

    await userCoursesRepository.save({
      course_id,
      user_id,
      expires_in: subHours(new Date(), 10),
    });

    const response = await request(app)
      .get(`/users/courses/${course_id}`)
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
