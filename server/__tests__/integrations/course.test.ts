import request from "supertest";
import { Connection, getConnection, getRepository } from "typeorm";

import app from "../../src/app";
import createConnection from "../../src/database";

let connection: Connection;

describe("User", () => {
  beforeAll(async () => {
    connection = await createConnection("test-connection");

    // await connection.query("DROP TABLE IF EXISTS orders_products");
    await connection.query("DROP TABLE IF EXISTS users");
    await connection.query("DROP TABLE IF EXISTS courses");
    // await connection.query("DROP TABLE IF EXISTS customers");
    await connection.query("DROP TABLE IF EXISTS migrations");

    await connection.runMigrations();
  });

  beforeEach(async () => {
    // await connection.query("DELETE FROM orders_products");
    await connection.query("DELETE FROM users");
    await connection.query("DELETE FROM courses");
    // await connection.query("DELETE FROM customers");
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
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
        "b3b2b892-6cf9-436c-b0b2-adf786eedc71",
        "44c9071d-75b9-44a8-8b6e-d63a4f671ad3",
        "40059610-0dca-4346-95f7-1a08b179b1af",
      ],
      modules: ["dc1bfbd5-2f06-4052-b1ce-aab8834cca99"],
    };

    const response = await request(app).post("/courses").send(course);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(course));
  });
});
