import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput, ActionButton } from "../../ui";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/registerSchema";

import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import axios from "axios";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      laboratory: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registration = useAuthStore((state) => state.register);

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registration({
        ...data,
        phoneNumber: `7${data.phoneNumber}`,
      });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        return;
      }

      toast.error("Не удалось зарегистрироваться");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <FormInput
        placeholder="Фамилия"
        error={!!errors.lastName}
        errorMessage={errors.lastName?.message}
        {...register("lastName")}
      />

      <FormInput
        placeholder="Имя"
        error={!!errors.firstName}
        errorMessage={errors.firstName?.message}
        {...register("firstName")}
      />

      <FormInput
        placeholder="Отчество (необязательно)"
        error={!!errors.middleName}
        errorMessage={errors.middleName?.message}
        {...register("middleName")}
      />

      <FormInput
        placeholder="Номер лаборатории"
        error={!!errors.laboratory}
        errorMessage={errors.laboratory?.message}
        {...register("laboratory")}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <PatternFormat
            customInput={FormInput}
            format="+7 (###) ###-##-##"
            allowEmptyFormatting
            mask="_"
            value={field.value}
            onValueChange={(values) => {
              const value = values.value.replace(/^[78]/, "");
              field.onChange(value);
            }}
            error={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
          />
        )}
      />
      <FormInput
        placeholder="Пароль"
        type="password"
        error={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <FormInput
        placeholder="Подтверждение пароля"
        type="password"
        error={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <ActionButton type="submit" className="w-full py-3 text-sm font-semibold">
        Создать аккаунт
      </ActionButton>
    </form>
  );
};
