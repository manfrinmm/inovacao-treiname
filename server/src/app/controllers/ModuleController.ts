import { Request, Response } from "express";

import DeleteModuleService from "../services/DeleteModuleService";

class ModuleController {
  async destroy(req: Request, res: Response): Promise<Response> {
    const deleteModule = new DeleteModuleService();

    const { module_id } = req.params;

    await deleteModule.execute(module_id);

    return res.status(204).json();
  }
}

export default new ModuleController();
