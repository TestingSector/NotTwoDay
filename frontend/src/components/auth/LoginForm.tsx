import { FormInput, ActionButton } from "../../ui";

export const LoginForm = () => {
  return (
    <form className="space-y-4">
      <FormInput placeholder="Номер телефона" type="tel" />

      <FormInput placeholder="Пароль" type="password" />

      <ActionButton type="submit" className="w-full py-3 text-sm font-semibold">
        Войти
      </ActionButton>
    </form>
  );
};
