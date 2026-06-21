import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { User } from "../../types/user";

import { getShortName } from "../../helpers/user";
import { roleLabels } from "../../helpers/shared/roleLabels";
import { formatDate } from "../../helpers/shared";

type UserRowProps = {
  user: User;
};

export const UserRow = ({ user }: UserRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-black/10 py-4">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="font-medium text-[var(--color-shell)]">
            {getShortName(user)}
          </p>

          <p className="text-sm text-black/60">{roleLabels[user.role]}</p>
        </div>

        <div className="mr-3 text-right text-xs text-black/50">
          {formatDate(user.createdAt)}
        </div>

        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isExpanded && (
        <div className="mt-4 flex flex-col gap-2">
          {user.role === "guest" ? (
            <>
              <button className="rounded-xl border p-3 text-left">
                Подтвердить пользователя
              </button>
            </>
          ) : (
            <>
              <button className="rounded-xl border p-3 text-left">
                Изменить роль
              </button>

              <button className="rounded-xl border p-3 text-left">
                Удалить пользователя
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
