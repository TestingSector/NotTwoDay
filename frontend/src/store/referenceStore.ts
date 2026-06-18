import { create } from "zustand";
import { getTestMethods } from "../api";
import type { TestMethod } from "../types/application";
import { devtools } from "zustand/middleware";

type ReferenceStore = {
  testMethods: TestMethod[];

  loadTestMethods: () => Promise<void>;
};

export const useReferenceStore = create<ReferenceStore>()(
  devtools(
    (set) => ({
      testMethods: [],

      loadTestMethods: async () => {
        const methods = await getTestMethods();

        set({
          testMethods: methods,
        });
      },
    }),
    {
      name: "ReferenceStore",
    },
  ),
);
