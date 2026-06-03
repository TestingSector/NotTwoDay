import type { TestMethod } from "../../types/application";
export const getTestNames = (methods: TestMethod[]) => {
  return [...new Set(methods.map((item) => item.name))];
};
