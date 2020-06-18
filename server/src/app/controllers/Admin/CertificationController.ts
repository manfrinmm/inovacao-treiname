import { Request, Response } from "express";

import Queue from "../../../libs/Queue";
import GenerateCertification from "../../jobs/GenerateCertification";

class CertificationController {
  async store(req: Request, res: Response): Promise<Response> {
    const { course_id, user_id } = req.body;

    await Queue.add(GenerateCertification.key, {
      course_id,
      user_id,
    });

    return res
      .status(200)
      .json({ message: "Certification will be available soon" });
  }
}

export default new CertificationController();
