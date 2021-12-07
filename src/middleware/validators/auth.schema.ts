import * as yup from "yup";

export const registerSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  }),
});

export const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
});
