import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../data/user/currentUser";
import { createTask } from "../api";

export const CreateTaskPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [gost, setGost] = useState("");

  const [estimatedTime, setEstimatedTime] = useState("");

  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = async () => {
    try {
      await createTask({
        title,
        gost,
        estimatedTime,
        isUrgent,

        creatorId: currentUser.id,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название"
          className="rounded border p-3"
        />

        <input
          value={gost}
          onChange={(e) => setGost(e.target.value)}
          placeholder="ГОСТ"
          className="rounded border p-3"
        />

        <input
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          placeholder="Время"
          className="rounded border p-3"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
          />
          Срочно
        </label>

        <button
          onClick={handleSubmit}
          className="rounded bg-black px-4 py-3 text-white"
        >
          Создать
        </button>
      </div>
    </div>
  );
};
