import { NextFunction, Request, Response } from "express";
import { Role } from "src/orm/entities/types";

export const checkRole = (roles: Role[], isSelfAllowed = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { id, role } = req.jwtPayload;
    const { id: requestId } = req.params;

    if (isSelfAllowed) {
      if (id === requestId) {
        return next();
      }
    }

    if (roles.indexOf(role) === -1) {
      return res.status(403).json({
        type: "UnAuthorized",
        message: "Unauthorized - Insufficient user rights.",
      });
    }

    return next();
  };
};
