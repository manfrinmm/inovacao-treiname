import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";
import Admin from "../../models/Admin";
import AdminsRepository from "../../repositories/AdminsRepository";

interface UpdateAdminRequest {
  admin_id: string;
  cpf: string;
  password?: string;
}

export default class UpdateAdminService {
  public async execute({
    admin_id,
    cpf,
    password,
  }: UpdateAdminRequest): Promise<Admin> {
    const adminsRepository = new AdminsRepository();

    const admin = await adminsRepository.findOne(admin_id);

    if (!admin) {
      throw new AppError("Admin not found", 400);
    }

    let adminUpdated;

    if (password) {
      const passwordHash = await hash(password, 8);

      adminUpdated = await adminsRepository.update({
        admin,
        cpf,
        password: passwordHash,
      });
    } else {
      adminUpdated = await adminsRepository.update({
        admin,
        cpf,
      });
    }

    return adminUpdated;
  }
}
