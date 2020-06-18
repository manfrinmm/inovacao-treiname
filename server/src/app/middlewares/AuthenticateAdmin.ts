import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

import authConfig from "../../config/auth";
import AppError from "../errors/AppError";
import AdminsRepository from "../repositories/AdminsRepository";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  payload: unknown | null;
}

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const adminsRepository = new AdminsRepository();

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as TokenPayload;

    const isAdmin = await adminsRepository.isAdmin(sub);

    if (!isAdmin) {
      throw new AppError(
        "Token is not valid. This route only is available for admins",
        401,
      );
    }

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(
        "Token is not valid. This route only is available for admins",
        401,
      );
    }
    throw new AppError("Token is not valid", 401);
  }
}
