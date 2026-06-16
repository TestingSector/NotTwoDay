import { useState } from "react";
import { LoginForm, RegisterForm } from "../components/auth";
export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-shell)] px-4 py-10 text-[var(--color-text)]">
      <div className="w-full max-w-md px-2">
        <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)] transition-all duration-500">
          <div className="px-5 py-6">
            <div className="relative flex rounded-[22px] bg-[var(--color-surface-secondary)] p-1">
              <span
                className={`absolute inset-y-1 w-1/2 rounded-[18px] bg-[var(--color-accent)] transition-all duration-500 ease-in-out ${
                  mode === "login" ? "left-1" : "right-1"
                }`}
              />

              <button
                type="button"
                onClick={() => setMode("login")}
                className={`relative z-10 flex-1 rounded-[18px] px-3 py-3 text-sm font-semibold transition-colors duration-300 ${
                  mode === "login"
                    ? "text-white"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                }`}
              >
                Авторизация
              </button>

              <button
                type="button"
                onClick={() => setMode("register")}
                className={`relative z-10 flex-1 rounded-[18px] px-3 py-3 text-sm font-semibold transition-colors duration-300 ${
                  mode === "register"
                    ? "text-white"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                }`}
              >
                Регистрация
              </button>
            </div>
          </div>

          <div className="px-6 pb-8">
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[28px] bg-[var(--color-surface-secondary)] p-5 shadow-[var(--shadow-soft)] transition-all duration-500 ease-in-out">
                {mode === "login" ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
