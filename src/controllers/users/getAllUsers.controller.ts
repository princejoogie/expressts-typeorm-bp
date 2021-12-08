import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";
import { CustomError } from "src/utils/response/customError";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getRepository(User);

  try {
    const users = await userRepository.find({
      select: [
        "id",
        "email",
        "firstName",
        "lastName",
        "createdAt",
        "updatedAt",
      ],
    });

    return res.customSuccess(200, users);
  } catch (err: any) {
    const customError = new CustomError(
      500,
      "InternalServerError",
      err.message
    );
    return next(customError);
  }
};
