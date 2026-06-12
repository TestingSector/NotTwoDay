import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";

import { ApplicationCard, FormInput } from "../../ui";
import type { ApplicationFormData } from "../../schemas/applicationSchema";

interface Props {
  control: Control<ApplicationFormData>;
  register: UseFormRegister<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  isDocumentTypeDisabled?: boolean;
}

export const DocumentSection = ({
  control,
  register,
  watch,
  errors,
  isDocumentTypeDisabled,
}: Props) => {
  const documentType = watch("documentType");

  return (
    <ApplicationCard title="Документ">
      <Controller
        name="documentType"
        control={control}
        render={({ field }) => (
          <div className="flex gap-2">
            <button
              type="button"
              disabled={isDocumentTypeDisabled}
              onClick={() => field.onChange("NTZ")}
              className={`flex-1 rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                field.value === "NTZ"
                  ? "bg-[var(--color-accent)] text-white"
                  : "border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
              }`}
            >
              НТЗ
            </button>

            <button
              type="button"
              disabled={isDocumentTypeDisabled}
              onClick={() => field.onChange("KPO")}
              className={`flex-1 rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                field.value === "KPO"
                  ? "bg-[var(--color-accent)] text-white"
                  : "border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
              }`}
            >
              КПО
            </button>
          </div>
        )}
      />

      <div
        className={`overflow-hidden transition-all duration-300 ${
          documentType === "KPO"
            ? "mt-4 max-h-32 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">
          Номер КПО
        </label>

        <FormInput {...register("kpoNumber")} placeholder="Введите номер КПО" />

        {errors.kpoNumber && (
          <p className="mt-1 text-xs text-red-400">
            {errors.kpoNumber.message}
          </p>
        )}
      </div>
    </ApplicationCard>
  );
};
