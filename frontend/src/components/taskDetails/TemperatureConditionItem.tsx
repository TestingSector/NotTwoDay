import { getTemperatureColor } from "../../helpers/taskDetails/getTemperatureColor";
import type { ApplicationTemperatureCondition } from "../../types/application/ApplicationTemperatureCondition";

type TemperatureConditionItemProps = {
  condition: ApplicationTemperatureCondition;
  nextCondition?: ApplicationTemperatureCondition;
  hasModulus: boolean;
  isLast: boolean;
};

export function TemperatureConditionItem({
  condition,
  nextCondition,
  hasModulus,
  isLast,
}: TemperatureConditionItemProps) {
  const currentColor = getTemperatureColor(condition.temperature);

  const nextColor = nextCondition
    ? getTemperatureColor(nextCondition.temperature)
    : currentColor;

  return (
    <div
      className={`relative grid ${
        hasModulus
          ? "grid-cols-[24px_1fr_70px_70px]"
          : "grid-cols-[24px_1fr_70px]"
      } items-center gap-3 py-3`}
    >
      {/* Точка + линия */}
      <div className="relative flex justify-center self-stretch">
        <div
          className="h-3 w-3 rounded-full"
          style={{
            background: currentColor,
          }}
        />

        {!isLast && (
          <div
            className="absolute top-3 w-[2px]"
            style={{
              height: "36px",
              background: `linear-gradient(${currentColor}, ${nextColor})`,
            }}
          />
        )}
      </div>

      {/* Температура */}
      <span className="font-medium">{condition.temperature} °C</span>

      {/* Модуль */}
      {hasModulus && (
        <div className="border-l border-r border-[var(--color-border)] text-center">
          {condition.modulus ? "E" : "—"}
        </div>
      )}

      {/* Количество */}
      <span className="text-right font-medium text-[var(--color-shell)]">
        {condition.quantity}
      </span>
    </div>
  );
}
