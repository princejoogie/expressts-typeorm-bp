import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";
import { registerDto } from "src/middleware/validators/schema/auth.schema";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, firstName, lastName, password } =
    req.body as registerDto["body"];
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({
        type: "UserAlreadyExistsError",
        message: "User already exists",
      });
    }

    const newUser = userRepository.create({
      email,
      firstName,
      lastName,
      password,
    });
    newUser.hashPassword();
    await userRepository.save(newUser);

    return res.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      accessToken: "token-fake",
    });
  } catch (err: any) {
    return res.status(400).json({
      type: err.name,
      message: err.message,
    });
  }
};
