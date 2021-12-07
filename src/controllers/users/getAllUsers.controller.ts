import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";

export const getUsers = async (req: Request, res: Response) => {
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

    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({
      name: err.name,
      message: err.message,
    });
  }
};
