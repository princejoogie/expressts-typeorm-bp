import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";
import { CustomError } from "src/utils/response/customError";

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, "NotFound", "User not found");
      return next(customError);
    }

    await userRepository.remove(user);

    return res.customSuccess(200, {
      message: `User ${user.email} deleted`,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err: any) {
    const customError = new CustomError(
      500,
      "InternalServerError",
      err.message
    );
    return next(customError);
  }
};
