import { useNavigate } from "react-router-dom";
import { FolderKanban, Plus, History } from "lucide-react";
import { QuickLinkCard } from "./QuickLinkCard";
import { StatCard } from "./StatCard";
import { useTasksStore } from "../../store/tasksStore";
import { getTaskStats } from "../../helpers/task";
import { useCurrentUser } from "../../helpers/useCurrentUser";
import {
  canCreateApplication,
  canViewHistory,
  canViewMyTasks,
} from "../../helpers/permissions";
import { toast } from "sonner";
export const DashboardWidgets = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const { pendingCount, activeCount, urgentCount } = getTaskStats(tasks);
  const user = useCurrentUser();
  const navigate = useNavigate();
  const links = [
    {
      title: "Мои задачи",
      to: "/my-tasks",
      icon: FolderKanban,
      visible: canViewMyTasks(user.role),
    },
    {
      title: "История задач",
      to: "/history",
      icon: History,
      visible: canViewHistory(user.role),
    },
  ];
  const handleCreateApplication = () => {
    if (!canCreateApplication(user.role)) {
      return toast.error("У вас недостаточно прав");
    }
    navigate("/create-application");
  };
  return (
    <div className="mt-5 snap-x snap-mandatory overflow-x-auto">
      <div className="flex min-w-max gap-3">
        <div className="w-[42%] shrink-0 snap-start">
          <div className="grid grid-cols-2 gap-2">
            <StatCard
              value={pendingCount}
              label="Ожидание"
              borderColor="#3B82F680"
              backgroundColor="#3B82F670"
            />

            <StatCard
              value={activeCount}
              label="В работе"
              borderColor="#22C55E80"
              backgroundColor="#22C55E70"
            />

            <StatCard
              value={urgentCount}
              label="Срочно"
              borderColor="#F59E0B80"
              backgroundColor="#F59E0B70"
            />

            <button
              onClick={handleCreateApplication}
              className="flex h-[64px] items-center justify-center rounded-[18px] bg-[var(--color-accent)]"
            >
              <Plus size={24} className="text-white" />
            </button>
          </div>
        </div>

        {links
          .filter((link) => link.visible)
          .map((link) => (
            <div
              key={link.to}
              className="h-[136px] w-[42%] shrink-0 snap-start"
            >
              <QuickLinkCard to={link.to} title={link.title} icon={link.icon} />
            </div>
          ))}
      </div>
    </div>
  );
};
