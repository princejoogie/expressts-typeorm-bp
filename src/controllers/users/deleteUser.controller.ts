import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        type: "NotFoundError",
        message: "User not found",
      });
    }

    await userRepository.remove(user);

    return res.status(200).json({
      message: `User ${user.email} deleted`,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      type: err.name,
      message: err.message,
    });
  }
};
