import { ApplicationCard, SelectRow } from "../../ui";

interface Props {
  selectedTestMethod: string;
  selectedStandard: string;
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

        <SelectRow
          label="Стандарт"
          value={selectedStandard || "Не выбрано"}
          onClick={handleOpenStandard}
        />
      </div>
    </ApplicationCard>
  );
};
