export function getTemperatureColor(temperature: number): string {
  if (temperature < 0) return "#3B82F6";

  if (temperature <= 25) return "#22C55E";

  if (temperature <= 120) return "#F59E0B";

  return "#EF4444";
}
