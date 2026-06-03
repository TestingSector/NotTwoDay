import type { TestMethod } from "../../types/application";

export const getAvailableStandards = (
  methods: TestMethod[],
  testMethod: string,
) => {
  return methods
    .filter((item) => item.name === testMethod)
    .map((item) => item.standard);
};
