import { ApplicationCard, FormInput } from "../../ui";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { ApplicationFormData } from "../../schemas/applicationSchema";

interface Props {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
}
export const TopicSection = ({ register, errors }: Props) => {
  return (
    <ApplicationCard title="Материал и тематика/договор">
      <FormInput
        {...register("materialName")}
        placeholder="Введите название материала"
      />

      {errors.materialName && (
        <p className="mt-1 text-xs text-red-400">
          {errors.materialName.message}
        </p>
      )}

      <div className="mt-4">
        <FormInput
          {...register("topic")}
          placeholder="Введите номер договора или тематику"
        />

        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
          Заполняется при необходимости
        </p>
      </div>
    </ApplicationCard>
  );
};
