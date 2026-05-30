import { useState } from "react";
import { ApplicationCard } from "../widgets/ApplicationCard";
import { FormInput } from "../widgets/FormInput";
import { SelectRow } from "../widgets/SelectRow";
import { FormSwitch } from "../widgets/FormSwitch";
import { FormTextarea } from "../widgets/FormTextarea";
export const CreateApplicationPage = () => {
  const [documentType, setDocumentType] = useState<"NTZ" | "KPO">("NTZ");
  const [temperatures] = useState([
    {
      id: 1,
      temperature: 20,
      samples: 6,
    },
    {
      id: 2,
      temperature: 120,
      samples: 6,
    },
  ]);
  const [kpoNumber, setKpoNumber] = useState("");
  const [topic, setTopic] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [urgentReason, setUrgentReason] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <header className="px-6 pt-14 pb-8">
        <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
          Создание заявки
        </h1>

        <p className="mt-3 text-sm text-white/70">Заявка на испытание</p>
      </header>

      <main className="flex-1 overflow-y-auto rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-6 pb-12">
        <div className="flex flex-col gap-4">
          <ApplicationCard title="Документ">
            <div className="flex gap-2">
              <button
                onClick={() => setDocumentType("NTZ")}
                className={`flex-1 rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                  documentType === "NTZ"
                    ? "bg-[var(--color-accent)] text-white"
                    : "border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
                }`}
              >
                НТЗ
              </button>

              <button
                onClick={() => setDocumentType("KPO")}
                className={`flex-1 rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                  documentType === "KPO"
                    ? "bg-[var(--color-accent)] text-white"
                    : "border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
                }`}
              >
                КПО
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                documentType === "KPO"
                  ? "mt-4 max-h-32 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">
                Номер КПО
              </label>

              <input
                value={kpoNumber}
                onChange={(e) => setKpoNumber(e.target.value)}
                placeholder="Введите номер КПО"
                className="
                  w-full
                  rounded-[18px]
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface-secondary)]
                  px-4
                  py-3
                  outline-none
                "
              />
            </div>
          </ApplicationCard>

          <ApplicationCard title="Тематика / договор">
            <FormInput
              value={topic}
              onChange={setTopic}
              placeholder="Введите номер договора или тематику"
            />

            <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
              Заполняется при необходимости
            </p>
          </ApplicationCard>
          <ApplicationCard title="Испытание">
            <div className="divide-y divide-[var(--color-border)]">
              <SelectRow label="Вид испытания" value="Не выбрано" />

              <SelectRow label="Стандарт" value="Не выбрано" />
            </div>
          </ApplicationCard>
          <ApplicationCard title="Температуры">
            <div className="flex flex-col gap-3">
              {temperatures.map((item) => (
                <div
                  key={item.id}
                  className="
          rounded-[18px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface-secondary)]
          p-4
        "
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      {item.temperature}°C
                    </p>

                    <button
                      type="button"
                      className="
              text-sm
              text-[var(--color-text-secondary)]
            "
                    >
                      Удалить
                    </button>
                  </div>

                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {item.samples} образцов
                  </p>
                </div>
              ))}

              <button
                type="button"
                className="
        rounded-[18px]
        border-2
        border-dashed
        border-[var(--color-border)]
        py-4
        text-sm
        font-medium
        text-[var(--color-text-secondary)]
        transition
      "
              >
                + Добавить температуру
              </button>
            </div>
          </ApplicationCard>
          <ApplicationCard title="Приоритет">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Срочная заявка</p>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Требует заполненной тематики или договора
                </p>
              </div>

              <FormSwitch
                checked={isUrgent}
                onChange={setIsUrgent}
                disabled={!topic.trim()}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isUrgent ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <FormInput
                value={urgentReason}
                onChange={setUrgentReason}
                placeholder="Укажите причину срочности"
              />
            </div>
          </ApplicationCard>
          <ApplicationCard title="Комментарий">
            <FormTextarea
              value={comment}
              onChange={setComment}
              placeholder="Добавьте комментарий к заявке"
            />

            <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
              Заполняется при необходимости
            </p>
          </ApplicationCard>
          <button
            type="button"
            className="
    mt-4
    w-full
    rounded-[20px]
    bg-[var(--color-accent)]
    px-6
    py-4
    text-base
    font-semibold
    text-white
    transition
    active:brightness-90
  "
            style={{
              boxShadow: "0 8px 20px rgba(176, 16, 43, 0.25)",
            }}
          >
            Создать заявку
          </button>
        </div>
      </main>
    </div>
  );
};
