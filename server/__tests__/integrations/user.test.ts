import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../src/app";
import {
  initializeConnection,
  truncateAll,
  closeConnection,
} from "../util/connectionDB";

describe("User", () => {
  beforeAll(async () => {
    await initializeConnection();
  });

  beforeEach(async () => {
    await truncateAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "Matheus Menezes",
      cpf: "00954368126",
      rg: "5717301",
      phone: "64996140384",
      password: "123",
    };

    const response = await request(app).post("/users").send(user);

    delete user.password;

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(user));
  });
});
