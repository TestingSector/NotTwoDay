import { create } from "zustand";
import { getTestMethods } from "../api";
import type { TestMethod } from "../types/application";

type ReferenceStore = {
  testMethods: TestMethod[];

  loadTestMethods: () => Promise<void>;
};

export const useReferenceStore = create<ReferenceStore>((set) => ({
  testMethods: [],

  loadTestMethods: async () => {
    const methods = await getTestMethods();

    set({
      testMethods: methods,
    });
  },
}));
