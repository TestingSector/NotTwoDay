import { ApplicationCard } from "../../../widgets/ApplicationCard";
import { FormInput } from "../../../widgets/FormInput";

interface Props {
  topic: string;
  onTopicChange: (value: string) => void;
  materialName: string;
  onMaterialNameChange: (value: string) => void;
}

export const TopicSection = ({ topic, onTopicChange, materialName, onMaterialNameChange }: Props) => {
  return (
    <>
    <ApplicationCard title="Материал и тематика/договор">
      <FormInput
        value={materialName}
        onChange={onMaterialNameChange}
        placeholder="Введите название материала"
      />
      <div className="mt-4">
      <FormInput
        value={topic}
        onChange={onTopicChange}
        placeholder="Введите номер договора или тематику"
      />
      <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
        Заполняется при необходимости
      </p>
      </div>
    </ApplicationCard>
    
    </>
  );
};
