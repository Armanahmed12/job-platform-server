import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError.js";

const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // auth() must run first
    const user = req.user;
    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "User not authenticated"
      );
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not authorized to access this resource"
      );
    }

    next();
  };
};

export default authorize;
