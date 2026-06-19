import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput, ActionButton } from "../../ui";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/registerSchema";
import { InputMask } from "@react-input/mask";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

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
      phoneNumber: "+7",
      password: "",
      confirmPassword: "",
    },
  });

  const registration = useAuthStore((state) => state.register);

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registration(data);

      navigate("/");
    } catch (error) {
      console.error(error);
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
          <InputMask
            component={FormInput}
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
            showMask
            {...field}
            error={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
            type="tel"
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
