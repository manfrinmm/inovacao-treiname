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
    // await connection.query("DROP TABLE IF EXISTS products");
    // await connection.query("DROP TABLE IF EXISTS customers");
    await connection.query("DROP TABLE IF EXISTS migrations");

    await connection.runMigrations();
  });

  beforeEach(async () => {
    // await connection.query("DELETE FROM orders_products");
    await connection.query("DELETE FROM users");
    // await connection.query("DELETE FROM products");
    // await connection.query("DELETE FROM customers");
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "Matheus Menezes",
      cpf: "12345679912",
      rg: "4512351",
      phone: "648851426845",
      password: "123",
    };

    console.log(user);
    const response = await request(app).post("/users").send(user);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(user));
  });
});
