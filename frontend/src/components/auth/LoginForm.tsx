import { FormInput, ActionButton } from "../../ui";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { PatternFormat } from "react-number-format";
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const onSubmit = async (data: LoginFormData) => {
    await login({
      ...data,
      phoneNumber: `7${data.phoneNumber}`,
    });

    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
              let value = values.value;

              if (value.startsWith("7")) {
                value = value.slice(1);
              }

              if (value.startsWith("8")) {
                value = value.slice(1);
              }

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
      <ActionButton type="submit" className="w-full py-3 text-sm font-semibold">
        Войти
      </ActionButton>
    </form>
  );
};
