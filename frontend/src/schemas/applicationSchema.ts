import { z } from "zod";

export const applicationSchema = z
  .object({
    documentType: z.enum(["NTZ", "KPO"]),

    kpoNumber: z.string(),

    materialName: z.string().trim().min(1, "Укажите материал"),

    topic: z.string(),

    isUrgent: z.boolean(),

    urgentReason: z.string(),

    comment: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.documentType === "KPO") {
      const validKpo =
        /^\d+\/630-\d{2}$/.test(data.kpoNumber) ||
        /^\d+\/(610|611|625)-\d{4}-611$/.test(data.kpoNumber);

      if (!validKpo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["kpoNumber"],
          message: "Формат: 12345/630-26 или 12345/611-2026-611",
        });
      }
    }

    if (data.isUrgent && !data.urgentReason.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["urgentReason"],
        message: "Укажите причину срочности",
      });
    }
  });

export type ApplicationFormData = z.infer<typeof applicationSchema>;
