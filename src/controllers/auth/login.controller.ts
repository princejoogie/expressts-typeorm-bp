/* eslint-disable consistent-return */
// import { Request, Response } from "express";
// import { getRepository } from "typeorm";
// import { User } from "src/orm/entities/User";
// import { loginDto } from "src/middleware/validators/schema/auth.schema";
// import { IJwtPayload } from "src/types/JwtPayload";
// import { createJwtToken } from "src/utils/helpers";
// import { Role } from "src/orm/entities/types";

// export const login = async (req: Request, res: Response): Promise<Response> => {
//   const { email, password } = req.body as loginDto["body"];
//   const userRepository = getRepository(User);

//   try {
//     const user = await userRepository.findOne({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(404).json({
//         type: "NotFoundError",
//         message: "User not found",
//       });
//     }

//     if (!user.isPasswordValid(password)) {
//       return res.status(400).json({
//         type: "BadRequestError",
//         message: "Password does not match",
//       });
//     }

//     const payload: IJwtPayload = {
//       id: user.id,
//       email: user.email,
//       role: user.role as Role,
//     };

//     return res.json({
//       accessToken: createJwtToken(payload),
//     });
//   } catch (err: any) {
//     return res.status(400).json({
//       type: err.name,
//       message: err.message,
//     });
//   }
// };

import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";
import { loginDto } from "src/middleware/validators/schema/auth.schema";
import { IJwtPayload } from "src/types/JwtPayload";
import { createJwtToken } from "src/utils/helpers";
import { Role } from "src/orm/entities/types";
import { CustomError } from "src/utils/response/customError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as loginDto["body"];
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      const customError = new CustomError(404, "NotFound", "User not found", [
        "Incorrect email or password",
      ]);
      return next(customError);
    }

    if (!user.isPasswordValid(password)) {
      const customError = new CustomError(
        400,
        "Validation",
        "Password does not match",
        ["Incorrect email or password"]
      );
      return next(customError);
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      tokenVersion: user.tokenVersion,
    };

    try {
      const token = createJwtToken(payload);
      return res.customSuccess(200, { token });
    } catch (err) {
      const customError = new CustomError(
        400,
        "Unprocessable",
        "Token cannot be created",
        null,
        err
      );
      return next(customError);
    }
  } catch (err: any) {
    const customError = new CustomError(
      500,
      "InternalServerError",
      "Error",
      null,
      err
    );
    return next(customError);
  }
};
