import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../../src/app";
import Admin from "../../../src/app/models/Admin";
import User from "../../../src/app/models/User";
import {
  initializeConnection,
  truncateAll,
  closeConnection,
} from "../../util/connectionDB";

describe("student/Session", () => {
  let tokenAdmin: string;

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

    tokenAdmin = response.body.token;
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

    const location = {
      countryCode: "BR",
      regionName: "Goias",
      city: "Jatai",
      query: "168.228.184.217",
    };

    await request(app).post("/users").send(user);

    const response = await request(app)
      .post("/sessions")
      .send({
        cpf: user.cpf,
        password: user.password,
        ...location,
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
    const response = await request(app).get(
      "/users/56b33232-fb38-4b9a-bd81-aa928926f54e/dashboard",
    );

    expect(response.status).toBe(400);
  });

  it("should not be able to access a private route with invalid token", async () => {
    const response = await request(app)
      .get("/users/56b33232-fb38-4b9a-bd81-aa928926f54e/dashboard")
      .set("Authorization", `Bearer invalid-token`);

    expect(response.status).toBe(401);
  });
});
