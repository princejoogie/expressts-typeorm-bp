import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";

export const list = async (req: Request, res: Response) => {
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

    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({
      name: err.name,
      message: err.message,
    });
  }
};
