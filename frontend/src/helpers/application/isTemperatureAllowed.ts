import type { TestMethod } from "../../types/application";

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
