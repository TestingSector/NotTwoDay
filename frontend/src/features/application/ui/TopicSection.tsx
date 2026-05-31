import { ApplicationCard } from "../../../widgets/ApplicationCard";
import { FormInput } from "../../../widgets/FormInput";

interface Props {
  topic: string;
  onTopicChange: (value: string) => void;
}

export const TopicSection = ({ topic, onTopicChange }: Props) => {
  return (
    <ApplicationCard title="Тематика / договор">
      <FormInput
        value={topic}
        onChange={onTopicChange}
        placeholder="Введите номер договора или тематику"
      />

      <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
        Заполняется при необходимости
      </p>
    </ApplicationCard>
  );
};
