import type { ApplicationTemperatureCondition } from "../../types/application";

export const isTemperatureUnique = (
  temperatures: ApplicationTemperatureCondition[],
  temperature: number,
) => {
  return !temperatures.some((item) => item.temperature === temperature);
};
