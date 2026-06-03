import type { TemperatureCondition } from "../../../types/application/DocumentType";
import type { TestMethod } from "../../../types/application/DocumentType";

export const isTemperatureUnique = (
  temperatures: TemperatureCondition[],
  temperature: number,
) => {
  return !temperatures.some((item) => item.temperature === temperature);
};

export const isTemperatureAllowed = (
  temperature: number,
  method?: TestMethod,
) => {
  if (!method) return true;

  return (
    temperature >= method.testTemperatureMin &&
    temperature <= method.testTemperatureMax
  );
};

export const isModulusAvailable = (
  temperature: number,
  modulusTemperatureMax?: number,
) => {
  if (modulusTemperatureMax === undefined) {
    return false;
  }

  return temperature <= modulusTemperatureMax;
};
