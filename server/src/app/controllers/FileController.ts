import { Request, Response } from "express";

class FileController {
  async store(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file;

    return res.status(201).json({ filename });
  }
}

export default new FileController();
