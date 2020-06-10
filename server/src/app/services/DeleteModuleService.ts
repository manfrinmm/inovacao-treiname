import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import Module from "../models/Module";

export default class DeleteModuleService {
  public async execute(module_id: string): Promise<void> {
    const modulesRepository = getRepository(Module);

    const module = await modulesRepository.findOne(module_id);

    if (!module) {
      throw new AppError("Module not found", 400);
    }

    await modulesRepository.remove(module);
  }
}
