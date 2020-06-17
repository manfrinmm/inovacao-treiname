import { Request, Response } from "express";

import ShowCertificationService from "../services/ShowCertificationService";

class CertificationController {
  async show(req: Request, res: Response) {
    const showCertification = new ShowCertificationService();
    const { id } = req.params;

    const certificationFormatted = `${id}.pdf`;

    const certification = await showCertification.execute(
      certificationFormatted,
    );

    return res.json(certification);
  }
}

export default new CertificationController();
