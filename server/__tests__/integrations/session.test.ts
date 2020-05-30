import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../src/app";
import User from "../../src/app/models/User";
import {
  initializeConnection,
  truncateAll,
  closeConnection,
} from "../util/connectionDB";

describe("Session", () => {
  beforeAll(async () => {
    await initializeConnection();
  });

  beforeEach(async () => {
    await truncateAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("should be able to authenticate a user", async () => {
    const user = {
      name: "Matheus Menezes",
      cpf: "1234567825368126",
      rg: "1230254",
      phone: "001234567854",
      password: "123",
    };

    await request(app).post("/users").send(user);
    const response = await request(app).post("/sessions").send({
      cpf: user.cpf,
      password: user.password,
    });

    delete user.password;

    expect(response.body).toHaveProperty("token");
  });

  it("should not be able to authenticate with non existing user ", async () => {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ cpf: "non-existing" });

    const response = await request(app).post("/sessions").send({
      cpf: "non-existing",
      password: "non-existing credential",
    });

    expect(response.status).toBe(401);
    expect(user).toBe(undefined);
  });

  it("should not be able to authenticate a user with wrong credentials", async () => {
    const user = {
      name: "Matheus Menezes",
      cpf: "1234567825368126",
      rg: "1230254",
      phone: "001234567854",
      password: "123",
    };

    await request(app).post("/users").send(user);
    const response = await request(app).post("/sessions").send({
      cpf: user.cpf,
      password: "wrong credential",
    });

    delete user.password;

    expect(response.status).toBe(401);
  });

  it("should not be able to access a private route without token", async () => {
    const response = await request(app).get("/courses");

    expect(response.status).toBe(400);
  });

  it("should not be able to access a private route with invalid token", async () => {
    const response = await request(app)
      .get("/courses")
      .set("Authorization", `Bearer invalid-token`);

    expect(response.status).toBe(401);
  });
});
