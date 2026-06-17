import { z } from "zod";
import { PHONE_REGEX } from "../helpers/constants";

export const registerSchema = z
  .object({
    lastName: z.string().trim().min(1, "Введите фамилию"),

    firstName: z.string().trim().min(1, "Введите имя"),

    middleName: z.string().trim().optional(),

    laboratory: z.string().trim().min(1, "Введите номер лаборатории"),

    phoneNumber: z
      .string()
      .min(1, "Введите номер телефона")
      .transform((value) => value.replace(/\D/g, ""))
      .refine(
        (value) => PHONE_REGEX.test(value),
        "Некорректный номер телефона",
      ),

    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),

    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Пароли не совпадают",
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
