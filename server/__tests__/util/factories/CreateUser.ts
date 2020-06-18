import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../../src/app";
import User from "../../../src/app/models/User";

interface CreateUserResponse {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  tokenUser: string;
}

export default async function (): Promise<CreateUserResponse> {
  const usersRepository = getRepository(User);

  const user = usersRepository.create({
    name: "Matheus Menezes",
    cpf: "1234567825368126",
    rg: "1230254",
    phone: "001234567854",
    password: "123",
  });

  await usersRepository.save(user);

  const location = {
    countryCode: "BR",
    regionName: "Goias",
    city: "Jatai",
    query: "168.228.184.217",
  };

  const sessionUserResponse = await request(app)
    .post("/sessions")
    .send({
      cpf: user.cpf,
      password: user.password,
      ...location,
    });

  const tokenUser = sessionUserResponse.body.token as string;

  return { tokenUser, ...user };
}
