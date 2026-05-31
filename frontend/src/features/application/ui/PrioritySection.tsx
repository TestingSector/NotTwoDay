import { ApplicationCard } from "../../../widgets/ApplicationCard";
import { FormInput } from "../../../widgets/FormInput";
import { FormSwitch } from "../../../widgets/FormSwitch";

interface Props {
  isUrgent: boolean;
  topic: string;
  urgentReason: string;

  onUrgentChange: (value: boolean) => void;
  onUrgentReasonChange: (value: string) => void;
}

export const PrioritySection = ({
  isUrgent,
  topic,
  urgentReason,
  onUrgentChange,
  onUrgentReasonChange,
}: Props) => {
  return (
    <ApplicationCard title="Приоритет">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Срочная заявка</p>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Требует заполненной тематики или договора
          </p>
        </div>

        <FormSwitch
          checked={isUrgent}
          onChange={onUrgentChange}
          disabled={!topic.trim()}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isUrgent ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <FormInput
          value={urgentReason}
          onChange={onUrgentReasonChange}
          placeholder="Укажите причину срочности"
        />
      </div>
    </ApplicationCard>
  );
};
