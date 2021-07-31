import * as yup from "yup";

export const createUserSchema = yup.object({
  fullName: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
