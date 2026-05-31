import { TEST_METHODS } from "../../../shared/mocks/testMethods";

export const getTestNames = () => {
  return [...new Set(TEST_METHODS.map((item) => item.name))];
};

export const getAvailableStandards = (testMethod: string) => {
  return TEST_METHODS.filter((item) => item.name === testMethod).map(
    (item) => item.standard,
  );
};

export const getSelectedMethod = (testMethod: string, standard: string) => {
  return TEST_METHODS.find(
    (item) => item.name === testMethod && item.standard === standard,
  );
};
