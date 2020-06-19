import { Request, Response } from "express";

import UpdateUserPasswordService from "../../services/student/UpdateUserPasswordService";

class UpdatePasswordController {
  async store(req: Request, res: Response) {
    const updateUserPassword = new UpdateUserPasswordService();

    const { password } = req.body;
    const user_id = req.user.id;

    await updateUserPassword.execute({ password, user_id });

    return res.status(200).json({ message: "Password updated" });
  }
}

export default new UpdatePasswordController();
