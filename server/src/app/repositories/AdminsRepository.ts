import { getRepository, Repository } from "typeorm";

import Admin from "../models/Admin";

export default class AdminsRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async isAdmin(admin_id: string): Promise<boolean> {
    const admin = await this.ormRepository.findOne(admin_id);

    return !!admin;
  }
}
