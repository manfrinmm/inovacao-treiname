import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../../src/app";
import Admin from "../../../src/app/models/Admin";
import LogsRepository from "../../../src/app/repositories/LogsRepository";
import UserCoursesRepository from "../../../src/app/repositories/UserCoursesRepository";
import {
  initializeConnection,
  truncateAll,
  closeConnection,
} from "../../util/connectionDB";

describe("admin/User", () => {
  let token: string;

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

    const { cpf } = admin;

    const response = await request(app).post("/sessions/admins").send({
      cpf,
      password: "123",
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("should be able to list all users", async () => {
    const user1 = {
      name: "Mathe2us Paulo",
      cpf: "1234567118126",
      rg: "123033254",
      phone: "001222234854",
      password: "1213",
    };

    const user2 = {
      name: "Matheus Menezes",
      cpf: "123452226368126",
      rg: "1230254",
      phone: "001234567854",
      password: "1223",
    };

    const user3 = {
      name: "Math222eus Maria",
      cpf: "123433356723232826",
      rg: "123022254",
      phone: "001234567854",
      password: "1323",
    };

    const response1 = request(app).post("/users").send(user1);
    const response2 = request(app).post("/users").send(user2);
    const response3 = request(app).post("/users").send(user3);

    await Promise.all([response1, response2, response3]);

    delete user1.password;
    delete user2.password;
    delete user3.password;

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(user1),
        expect.objectContaining(user2),
        expect.objectContaining(user3),
      ]),
    );
  });

  it("should be able to show user details", async () => {
    const user = {
      name: "Mathe2us Paulo",
      cpf: "1234567118126",
      rg: "123033254",
      phone: "001222234854",
      password: "1213",
    };

    const logsRepository = new LogsRepository();
    const userCoursesRepository = new UserCoursesRepository();
    const userResponse = await request(app).post("/users").send(user);
    const user_id = userResponse.body.id;

    const courses = await userCoursesRepository.findAllByUser(user_id);
    const logs = await logsRepository.findAllByUser(user_id);

    const response = await request(app)
      .get(`/users/${user_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...userResponse.body,
        courses: expect.arrayContaining(
          courses.map(course => expect.objectContaining(course)),
        ),
        logs: expect.arrayContaining(
          logs.map(log => expect.objectContaining(log)),
        ),
      }),
    );
  });

  it("should be able to release a course for a user", async () => {
    const user = {
      name: "Mathe2us Paulo",
      cpf: "1234567118126",
      rg: "123033254",
      phone: "001222234854",
      password: "1213",
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

    const userResponse = await request(app).post("/users").send(user);
    const user_id = userResponse.body.id;

    const courseResponse = await request(app)
      .post("/courses")
      .send(course)
      .set("Authorization", `Bearer ${token}`);
    const course_id = courseResponse.body.id;

    const response = await request(app)
      .post("/user-courses/")
      .send({ user_id, course_id })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        user_id,
        course_id,
      }),
    );
  });

  it("should be able to update a user", async () => {
    const user = {
      name: "Mathe2us Paulo",
      cpf: "1234567118126",
      rg: "123033254",
      phone: "001222234854",
      password: "1213",
    };

    const userResponse = await request(app).post("/users").send(user);
    const user_id = userResponse.body.id;

    let userUpdated = {
      rg: "123",
      phone: "45454",
      password: "123",
    };

    delete user.password;
    delete userUpdated.password;

    userUpdated = { ...user, ...userUpdated };

    const response = await request(app)
      .put(`/users/${user_id}`)
      .send(userUpdated)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(userUpdated));
  });
});
