import { Request, Response } from "express";

import UpdateAdminService from "../../services/Admin/UpdateAdminService";

class UpdateAdminController {
  async update(req: Request, res: Response) {
    const updateUserPassword = new UpdateAdminService();

    const { cpf, password } = req.body;
    const admin_id = req.user.id;

    const adminUpdated = await updateUserPassword.execute({
      admin_id,
      cpf,
      password,
    });

    return res.status(200).json(adminUpdated);
  }
}

export default new UpdateAdminController();
