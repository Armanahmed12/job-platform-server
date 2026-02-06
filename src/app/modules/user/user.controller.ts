import { Request, Response, NextFunction } from "express";
import { UserServices } from "./user.service.js";

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const {uid, email} = req.user;

    const user = await UserServices.createUserInDB({uid, email});

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error); // pass error to global error handler
  }
};

export const UserController = {
  createUserController,
};
