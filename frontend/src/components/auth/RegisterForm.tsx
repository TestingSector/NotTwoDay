import { FormInput, ActionButton } from "../../ui";

export const RegisterForm = () => {
  return (
    <form className="space-y-4">
      <FormInput placeholder="Фамилия" />

      <FormInput placeholder="Имя" />

      <FormInput placeholder="Отчество (необязательно)" />

      <FormInput placeholder="Лаборатория" />

      <FormInput placeholder="Номер телефона" type="tel" />

      <FormInput placeholder="Пароль" type="password" />

      <FormInput placeholder="Подтверждение пароля" type="password" />

      <ActionButton type="submit" className="w-full py-3 text-sm font-semibold">
        Создать аккаунт
      </ActionButton>
    </form>
  );
};
