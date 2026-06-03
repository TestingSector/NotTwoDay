export type DocumentType = "NTZ" | "KPO";

export interface TemperatureCondition {
  id: number;
  temperature: number;
  samples: number;
  modulus: boolean;
}

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
