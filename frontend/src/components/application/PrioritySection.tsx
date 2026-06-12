import type { ApplicationFormData } from "../../schemas/applicationSchema";
import { ApplicationCard, FormInput, FormSwitch } from "../../ui";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
interface Props {
  control: Control<ApplicationFormData>;
  register: UseFormRegister<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
}

export const PrioritySection = ({
  control,
  register,
  watch,
  errors,
}: Props) => {
  const isUrgent = watch("isUrgent");
  const topic = watch("topic");
  return (
    <ApplicationCard title="Приоритет">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Срочная заявка</p>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Требует заполненной тематики или договора
          </p>
        </div>
        <Controller
          name="isUrgent"
          control={control}
          render={({ field }) => (
            <FormSwitch
              checked={field.value}
              onChange={field.onChange}
              disabled={!topic.trim()}
            />
          )}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isUrgent ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <FormInput
          {...register("urgentReason")}
          placeholder="Укажите причину срочности"
        />
        {errors.urgentReason && (
          <p className="mt-1 text-xs text-red-400">
            {errors.urgentReason.message}
          </p>
        )}
      </div>
    </ApplicationCard>
  );
};
