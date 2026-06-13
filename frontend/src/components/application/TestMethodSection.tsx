import type { ApplicationFormData } from "../../schemas/applicationSchema";
import { ApplicationCard, SelectRow } from "../../ui";
import type { FieldErrors } from "react-hook-form";
interface Props {
  selectedTestMethod: string;
  selectedStandard: string;

  errors: FieldErrors<ApplicationFormData>;

  disabled?: boolean;

  onOpenTestMethod: () => void;
  onOpenStandard: () => void;
}

export const TestMethodSection = ({
  selectedTestMethod,
  selectedStandard,
  onOpenTestMethod,
  onOpenStandard,
  disabled,
  errors,
}: Props) => {
  const handleOpenTestMethod = () => {
    if (disabled) return;

    onOpenTestMethod();
  };
  const handleOpenStandard = () => {
    if (disabled) return;

    onOpenStandard();
  };
  return (
    <ApplicationCard title="Испытание">
      <div className="divide-y divide-[var(--color-border)]">
        <SelectRow
          label="Вид испытания"
          value={selectedTestMethod || "Не выбрано"}
          onClick={handleOpenTestMethod}
        />
        {errors.selectedTestMethod && (
          <p className="mt-1 text-xs text-red-400">
            {errors.selectedTestMethod.message}
          </p>
        )}
        <SelectRow
          label="Стандарт"
          value={selectedStandard || "Не выбрано"}
          onClick={handleOpenStandard}
        />
        {errors.selectedStandard && (
          <p className="mt-1 text-xs text-red-400">
            {errors.selectedStandard.message}
          </p>
        )}
      </div>
    </ApplicationCard>
  );
};
