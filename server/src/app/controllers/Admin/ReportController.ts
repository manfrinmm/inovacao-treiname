import { Request, Response } from "express";

import GenerateReportService from "../../services/Admin/GenerateReportService";

class ReportController {
  async index(req: Request, res: Response) {
    const generateReport = new GenerateReportService();

    const report = await generateReport.execute();

    res.send(report);
  }
}

export default new ReportController();
