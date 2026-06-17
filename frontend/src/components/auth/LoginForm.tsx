import { FormInput, ActionButton } from "../../ui";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/loginSchema";
import { InputMask } from "@react-input/mask";

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
      phoneNumber: "+7",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
      <ActionButton type="submit" className="w-full py-3 text-sm font-semibold">
        Войти
      </ActionButton>
    </form>
  );
};
