import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

import authConfig from "../../config/auth";
import AppError from "../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  payload: unknown | null;
}

export default function (
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError("Token is not valid", 401);
  }
}
