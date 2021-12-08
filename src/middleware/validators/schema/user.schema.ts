import * as yup from "yup";
import { IValidator } from "../validator";

// register schema
export interface registerDto {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}

export const registerSchema: IValidator = {
  body: yup.object({
    email: yup.string().email().trim().required(),
    password: yup.string().min(6).trim().required(),
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
  }),
};

// login schema
export interface loginDto {
  body: {
    email: string;
    password: string;
  };
}

export const loginSchema: IValidator = {
  body: yup.object({
    email: yup.string().email().trim().required(),
    password: yup.string().min(6).trim().required(),
  }),
};
