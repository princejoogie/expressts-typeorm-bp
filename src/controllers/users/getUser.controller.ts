import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";
import { CustomError } from "src/utils/response/customError";

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne(id, {
      select: [
        "id",
        "email",
        "firstName",
        "lastName",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) {
      const customError = new CustomError(404, "NotFound", "User not found");
      return next(customError);
    }

    return res.customSuccess(200, user);
  } catch (err: any) {
    const customError = new CustomError(
      500,
      "InternalServerError",
      err.message
    );
    return next(customError);
  }
};
