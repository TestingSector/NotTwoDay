import { z } from "zod";

export const applicationSchema = z
  .object({
    documentType: z.enum(["NTZ", "KPO"]),

    kpoNumber: z.string().trim(),
    draftTemperature: z.string(),
    draftQuantity: z.string(),
    customTestMethod: z.string(),
    customStandard: z.string(),

    materialName: z.string().trim().min(1, "Укажите материал"),

    topic: z.string(),

    isUrgent: z.boolean(),

    urgentReason: z.string(),

    comment: z.string(),
    selectedTestMethod: z.string().min(1, "Выберите испытание"),
    selectedStandard: z.string().min(1, "Выберите стандарт"),
    isCustomTestMethod: z.boolean(),
    isCustomStandard: z.boolean(),
    temperatures: z
      .array(
        z.object({
          temperature: z.number(),
          quantity: z.number(),
          modulus: z.boolean(),
        }),
      )
      .min(1, "Добавьте температуры"),
  })
  .superRefine((data, ctx) => {
    if (data.documentType === "KPO") {
      const kpo = data.kpoNumber ?? "";
      if (!kpo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["kpoNumber"],
          message: "Укажите номер КПО",
        });
      } else {
        const validKpo =
          /^\d+\/630-\d{2}$/.test(kpo) ||
          /^\d+\/(610|611|625)-\d{4}-611$/.test(kpo);

        if (!validKpo) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["kpoNumber"],
            message: "Формат: 12345/630-26 или 12345/611-2026-611",
          });
        }
      }
    }

    if (data.isUrgent && !data.urgentReason.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["urgentReason"],
        message: "Укажите причину срочности",
      });
    }
    const standardPattern = /(ГОСТ|ASTM|ISO|ОСТ)/i;

    if (data.selectedStandard && !standardPattern.test(data.selectedStandard)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["selectedStandard"],
        message: "Укажите ГОСТ, ASTM, ISO или ОСТ",
      });
    }
  });

export type ApplicationFormData = z.infer<typeof applicationSchema>;
