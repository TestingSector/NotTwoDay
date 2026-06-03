export const isModulusAvailable = (
  temperature: number,
  modulusTemperatureMax?: number,
) => {
  if (modulusTemperatureMax === undefined) {
    return false;
  }

  return temperature <= modulusTemperatureMax;
};
