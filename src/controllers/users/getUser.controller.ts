import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
      return res.status(404).json({
        name: "NotFoundError",
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(500).json({
      name: err.name,
      message: err.message,
    });
  }
};
