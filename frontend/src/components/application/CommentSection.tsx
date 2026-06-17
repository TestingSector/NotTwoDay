import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ApplicationCard, FormTextarea } from "../../ui";
import type { ApplicationFormData } from "../../schemas/applicationSchema";

interface Props {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  isCommentSectionDisabled?: boolean;
}

export const CommentSection = ({
  register,
  errors,
  isCommentSectionDisabled,
}: Props) => {
  return (
    <ApplicationCard title="Комментарий">
      <FormTextarea
        {...register("comment")}
        disabled={isCommentSectionDisabled}
        placeholder="Добавьте комментарий к заявке"
        error={!!errors.comment}
        errorMessage={errors.comment?.message}
      />

      <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
        Заполняется при необходимости
      </p>
    </ApplicationCard>
  );
};
