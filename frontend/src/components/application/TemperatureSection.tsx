import { ApplicationCard, FormSwitch } from "../../ui";
import { isModulusAvailable } from "../../helpers/application";
import type {
  ApplicationTemperatureCondition,
  TestMethod,
} from "../../types/application";
import type { FieldErrors } from "react-hook-form";
import type { ApplicationFormData } from "../../schemas/applicationSchema";

type TemperatureSectionProps = {
  temperatures: ApplicationTemperatureCondition[];
  selectedMethod?: TestMethod;
  onAddTemperature: () => void;
  onDeleteTemperature: (index: number) => void;
  onToggleModulus: (index: number, value: boolean) => void;
  errors?: FieldErrors<ApplicationFormData>;
};

export const TemperatureSection = ({
  temperatures,
  selectedMethod,
  onAddTemperature,
  onDeleteTemperature,
  onToggleModulus,
  errors,
}: TemperatureSectionProps) => {
  return (
    <ApplicationCard title="Температуры">
      <div className="flex flex-col gap-3">
        {temperatures.map((item) => (
          <div
            key={item.temperature}
            className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{item.temperature}°C</p>

              <button
                type="button"
                onClick={() => onDeleteTemperature(item.temperature)}
                className="text-sm text-[var(--color-accent)]"
              >
                Удалить
              </button>
            </div>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {item.quantity} образцов
            </p>

            {selectedMethod?.supportsModulus &&
              (isModulusAvailable(
                item.temperature,
                selectedMethod.modulusTemperatureMax,
              ) ? (
                <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                  <div>
                    <p className="font-medium">Определение модуля</p>

                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      Добавить измерение модуля
                    </p>
                  </div>

                  <FormSwitch
                    checked={item.modulus}
                    onChange={(value) =>
                      onToggleModulus(item.temperature, value)
                    }
                  />
                </div>
              ) : (
                <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                  <p className="font-medium text-[var(--color-text-secondary)]">
                    Модуль недоступен
                  </p>

                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    Допустимый диапазон до{" "}
                    {selectedMethod.modulusTemperatureMax}
                    °C
                  </p>
                </div>
              ))}
          </div>
        ))}
        {errors?.temperatures && (
          <p className="mt-1 text-xs text-red-400">
            {errors.temperatures.message}
          </p>
        )}
        <button
          type="button"
          onClick={onAddTemperature}
          className="rounded-[18px] border-2 border-dashed border-[var(--color-border)] py-4 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-secondary)]"
        >
          + Добавить температуру
        </button>
      </div>
    </ApplicationCard>
  );
};
