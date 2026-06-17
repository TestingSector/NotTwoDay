import { useState } from "react";

import { LoginForm, RegisterForm } from "../components/auth";

export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-[100dvh] bg-[var(--color-shell)] px-4 pt-24">
      <div className="mx-auto w-full max-w-md rounded-[32px] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
        <div className="mb-6">
          <div className="relative flex rounded-[22px] bg-[var(--color-surface-secondary)] p-1">
            <span
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-[18px] bg-[var(--color-accent)] transition-all duration-300 ${
                mode === "login" ? "left-1" : "left-[calc(50%+2px)]"
              } `}
            />

            <button
              type="button"
              onClick={() => setMode("login")}
              className={`relative z-10 flex-1 rounded-[18px] py-3 text-sm font-semibold transition-colors ${
                mode === "login"
                  ? "text-white"
                  : "text-[var(--color-text-secondary)]"
              } `}
            >
              Авторизация
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`relative z-10 flex-1 rounded-[18px] py-3 text-sm font-semibold transition-colors ${
                mode === "register"
                  ? "text-white"
                  : "text-[var(--color-text-secondary)]"
              } `}
            >
              Регистрация
            </button>
          </div>
        </div>

        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};
