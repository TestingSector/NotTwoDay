import { ApplicationCard, FormTextarea } from "../../ui";

interface Props {
  comment: string;
  onCommentChange: (value: string) => void;
  isCommentSectionDisabled?: boolean;
}

export const CommentSection = ({
  comment,
  onCommentChange,
  isCommentSectionDisabled,
}: Props) => {
  return (
    <ApplicationCard title="Комментарий">
      <FormTextarea
        disabled={isCommentSectionDisabled}
        value={comment}
        onChange={onCommentChange}
        placeholder="Добавьте комментарий к заявке"
      />

      <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
        Заполняется при необходимости
      </p>
    </ApplicationCard>
  );
};
