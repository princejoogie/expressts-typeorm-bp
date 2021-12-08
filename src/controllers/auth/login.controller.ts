import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";
import { loginDto } from "src/middleware/validators/schema/auth.schema";
import { IJwtPayload } from "src/types/JwtPayload";
import { createJwtToken } from "src/utils/helpers";
import { Role } from "src/orm/entities/types";

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body as loginDto["body"];
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

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role as Role,
    };

    return res.json({
      accessToken: createJwtToken(payload),
    });
  } catch (err: any) {
    return res.status(400).json({
      type: err.name,
      message: err.message,
    });
  }
};
