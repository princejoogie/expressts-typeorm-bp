import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        type: "NotFoundError",
        message: "User not found",
      });
    }

    if (!user.isPasswordValid(password)) {
      return res.status(400).json({
        type: "BadRequestError",
        message: "Password does not match",
      });
    }

    return res.json({
      accessToken: "token-fake",
    });
  } catch (err: any) {
    return res.status(400).json({
      type: err.name,
      message: err.message,
    });
  }
};
