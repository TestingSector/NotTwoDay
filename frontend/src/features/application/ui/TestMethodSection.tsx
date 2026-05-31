import { ApplicationCard } from "../../../widgets/ApplicationCard";
import { SelectRow } from "../../../widgets/SelectRow";

interface Props {
  selectedTestMethod: string;
  selectedStandard: string;

  onOpenTestMethod: () => void;
  onOpenStandard: () => void;
}

export const TestMethodSection = ({
  selectedTestMethod,
  selectedStandard,
  onOpenTestMethod,
  onOpenStandard,
}: Props) => {
  return (
    <ApplicationCard title="Испытание">
      <div className="divide-y divide-[var(--color-border)]">
        <SelectRow
          label="Вид испытания"
          value={selectedTestMethod || "Не выбрано"}
          onClick={onOpenTestMethod}
        />

        <SelectRow
          label="Стандарт"
          value={selectedStandard || "Не выбрано"}
          onClick={onOpenStandard}
        />
      </div>
    </ApplicationCard>
  );
};
