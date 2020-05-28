import { getRepository, Repository } from "typeorm";

import Module from "../models/Module";

interface CreateModuleDTO {
  name: string;
  description: string;
  video_link?: string;
  extra_link?: string;
  file: string;
}

export default class ModulesRepository {
  private ormRepository: Repository<Module>;

  constructor() {
    this.ormRepository = getRepository(Module);
  }

  public async createMany(moduleData: CreateModuleDTO[]): Promise<Module[]> {
    const modules = this.ormRepository.create(moduleData);

    await this.ormRepository.save(modules);

    return modules;
  }
}
