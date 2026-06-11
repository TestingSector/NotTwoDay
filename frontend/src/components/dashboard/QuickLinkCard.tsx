import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type QuickLinkCardProps = {
  to: string;
  title: string;
  icon: LucideIcon;
};

export const QuickLinkCard = ({
  to,
  title,
  icon: Icon,
}: QuickLinkCardProps) => {
  return (
    <Link
      to={to}
      className="flex min-w-full flex-col items-center justify-center rounded-[24px] bg-[var(--color-shell-card)] p-4 transition-transform active:scale-95"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/10">
        <Icon size={30} className="text-white" />
      </div>

      <p className="mt-3 text-center text-sm font-medium text-white">{title}</p>
    </Link>
  );
};
