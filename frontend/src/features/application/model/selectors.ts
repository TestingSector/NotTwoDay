import type { TestMethod } from "../../../types/application/DocumentType";

export const getTestNames = (methods: TestMethod[]) => {
  return [...new Set(methods.map((item) => item.name))];
};

export const getAvailableStandards = (
  methods: TestMethod[],
  testMethod: string,
) => {
  return methods
    .filter((item) => item.name === testMethod)
    .map((item) => item.standard);
};

export const getSelectedMethod = (
  methods: TestMethod[],
  testMethod: string,
  standard: string,
) => {
  return methods.find(
    (item) => item.name === testMethod && item.standard === standard,
  );
};
