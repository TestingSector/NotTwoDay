import type { TestMethod } from "../../types/application";

export const getSelectedMethod = (
  methods: TestMethod[],
  testMethod: string,
  standard: string,
) => {
  return methods.find(
    (item) => item.name === testMethod && item.standard === standard,
  );
};
