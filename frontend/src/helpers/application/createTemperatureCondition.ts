import type { ApplicationTemperatureCondition } from "../../types/application";
export const createTemperatureCondition = (
  temperature: number,
  quantity: number,
  defaultModulus = false,
): ApplicationTemperatureCondition => {
  return {
    temperature,
    quantity,
    modulus: defaultModulus,
  };
};
