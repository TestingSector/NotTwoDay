import type { ApplicationTemperatureCondition } from "../../types/application/ApplicationTemperatureCondition";
import { TemperatureConditionItem } from "./TemperatureConditionItem";

type TemperatureConditionsCardProps = {
  standard: string;
  conditions: ApplicationTemperatureCondition[];
};

export function TemperatureConditionsCard({
  standard,
  conditions,
}: TemperatureConditionsCardProps) {
  const hasModulus = conditions.some((condition) => condition.modulus);

  const totalQuantity = conditions.reduce(
    (sum, condition) => sum + condition.quantity,
    0,
  );

  return (
    <div
      className="mt-6 rounded-[24px] bg-[var(--color-surface)] p-5"
      style={{
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          Условия испытаний
        </p>

        <h2 className="mt-1 text-xl font-semibold text-[var(--color-shell)]">
          {standard}
        </h2>
      </div>

      <div
        className={`grid ${
          hasModulus
            ? "grid-cols-[24px_1fr_70px_70px]"
            : "grid-cols-[24px_1fr_70px]"
        } items-center gap-3 border-b border-[var(--color-border)] pb-3 text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]`}
      >
        <div />

        <span>Темп.</span>

        {hasModulus && <span className="text-center">Модуль</span>}

        <span className="text-right">Шт.</span>
      </div>

      <div className="mt-2">
        {conditions.map((condition, index) => (
          <TemperatureConditionItem
            key={condition.temperature}
            condition={condition}
            nextCondition={conditions[index + 1]}
            hasModulus={hasModulus}
            isLast={index === conditions.length - 1}
          />
        ))}
      </div>

      <div className="mt-3 border-t border-[var(--color-border)] pt-4 text-right">
        <span className="text-[var(--color-text-secondary)]">Итого:</span>

        <span className="ml-2 font-semibold">{totalQuantity}</span>
      </div>
    </div>
  );
}
