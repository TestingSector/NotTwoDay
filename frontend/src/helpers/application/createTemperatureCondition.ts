import type { ApplicationTemperatureCondition } from "../../types/application";
export const createTemperatureCondition = (
  temperature: number,
  samples: number,
  defaultModulus = false,
): ApplicationTemperatureCondition => {
  return {
    id: Date.now(),
    temperature,
    samples,
    modulus: defaultModulus,
  };
};
