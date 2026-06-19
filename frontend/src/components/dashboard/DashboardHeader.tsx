import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../helpers/useCurrentUser";
import { User } from "lucide-react";

export const DashboardHeader = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/profile")}
      className="mt-4 grid w-full grid-cols-[1fr_23%] gap-2"
    >
      <div className="text-left">
        <h1 className="mt-2 text-[32px] font-semibold leading-none text-white">
          {user.firstName}
        </h1>

        <p className="mt-2 text-sm text-white/60">
          Лаборатория №{user.laboratory}
        </p>
      </div>

      <div className="mx-[8%] flex h-[64px] items-center justify-center self-center rounded-[18px] bg-white/10 backdrop-blur-sm">
        <User className="text-white" />
      </div>
    </button>
  );
};
