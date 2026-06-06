import type { User } from "../../types/user";

type DashboardHeaderProps = {
  user: User;
};

export const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  return (
    <>
      {" "}
      <div className="absolute -top-20 left-0 overflow-hidden">
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          className="opacity-60"
        >
          <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
            <path d="M40 20 L80 60 L40 100 L0 60 Z" />
            <path d="M120 20 L160 60 L120 100 L80 60 Z" />
            <path d="M200 20 L240 60 L200 100 L160 60 Z" />

            <path d="M80 60 L120 100 L80 140 L40 100 Z" />
            <path d="M160 60 L200 100 L160 140 L120 100 Z" />

            <path d="M40 100 L80 140 L40 180 L0 140 Z" />
            <path d="M120 100 L160 140 L120 180 L80 140 Z" />
          </g>
        </svg>
      </div>
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-white/10" />
      <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-white/5" />
      <div>
        <h1 className="mt-2 text-[32px] font-semibold leading-none text-white">
          {user.firstName}
        </h1>

        <p className="mt-2 text-sm text-white/60">
          Лаборатория №{user.laboratory}
        </p>
      </div>
    </>
  );
};
