export interface TestMethod {
  id: string;

  name: string;
  standard: string;

  supportsModulus: boolean;
  defaultModulus: boolean;

  testTemperatureMin: number;
  testTemperatureMax: number;

  modulusTemperatureMax: number;

  calculationType: string;
}
