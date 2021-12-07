import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, firstName, lastName, password } = req.body;
  const userRepository = getRepository(User);

  try {
    const user = userRepository.create({
      email,
      firstName,
      lastName,
      password,
    });

    user.hashPassword();
    userRepository.save(user);

    return res.json({
      accessToken: "token-fake",
    });
  } catch (err: any) {
    return res.status(500).json({
      name: err.name,
      message: err.message,
    });
  }
};
