import { getRepository, Repository } from "typeorm";

import Admin from "../models/Admin";

interface UpdateAdminDTO {
  admin: Admin;
  cpf: string;
  password?: string;
}

export default class AdminsRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async isAdmin(admin_id: string): Promise<boolean> {
    const admin = await this.ormRepository.findOne(admin_id);

    return !!admin;
  }

  public async update({
    admin,
    cpf,
    password,
  }: UpdateAdminDTO): Promise<Admin> {
    const adminUpdated = this.ormRepository.merge(admin, { cpf, password });

    await this.ormRepository.save(adminUpdated);

    return adminUpdated;
  }

  public async findOne(admin_id: string): Promise<Admin | undefined> {
    const admin = await this.ormRepository.findOne(admin_id);

    return admin;
  }
}
