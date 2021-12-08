import { Role } from "src/orm/entities/types";

export type IJwtPayload = {
  id: string;
  email: string;
  role: Role;
  tokenVersion: number;
};
