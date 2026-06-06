import type { LucideIcon } from "lucide-react";
import { taskInformationVariants } from "../../helpers/taskDetails/taskInformationVariants";

type TaskInformationVariant = "urgent" | "material" | "document";
type TaskInformationProps = {
  title: string;
  description: string | undefined;
  Icon: LucideIcon;
  variant: TaskInformationVariant;
};

export const TaskInformation = ({
  Icon,
  title,
  description,
  variant,
}: TaskInformationProps) => {
  const styles = taskInformationVariants[variant];
  return (
    <div
      className={`mt-3 grid grid-cols-[40px_1fr] gap-3 rounded-[24px] p-5 ${styles.container}`}
      style={{
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="pt-1">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            background: styles.iconBg,
            color: styles.iconColor,
          }}
        >
          <Icon size={24} />
        </div>
      </div>

      <div>
        <p
          style={{
            color: styles.titleColor,
          }}
          className="text-xs"
        >
          {title}
        </p>
        <p
          className="break-words font-semibold leading-relaxed"
          style={{
            color: styles.descriptionColor,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
