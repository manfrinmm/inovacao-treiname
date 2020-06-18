import request from "supertest";
import { getRepository } from "typeorm";

import app from "../../../src/app";
import Admin from "../../../src/app/models/Admin";

interface CreateAdminResponse {
  id: string;
  cpf: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  tokenAdmin: string;
}

export default async function (): Promise<CreateAdminResponse> {
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

  const tokenAdmin = sessionAdminResponse.body.token as string;

  return { tokenAdmin, ...admin };
}
