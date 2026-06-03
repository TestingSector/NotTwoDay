import type { TemperatureCondition } from "../../shared/types/task";
export const createTemperatureCondition = (
  temperature: number,
  samples: number,
  defaultModulus = false,
): TemperatureCondition => {
  return {
    id: Date.now(),
    temperature,
    samples,
    modulus: defaultModulus,
  };
};
