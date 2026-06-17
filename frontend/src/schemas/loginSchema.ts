import { z } from "zod";
import { PHONE_REGEX } from "../helpers/constants";

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Введите номер телефона")
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => PHONE_REGEX.test(value), "Некорректный номер телефона"),
  password: z.string().min(1, "Введите пароль"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
