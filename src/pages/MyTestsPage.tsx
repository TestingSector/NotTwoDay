import { TasksOverview } from "../widgets/TasksOverview";
import { TestCard } from "../widgets/TestCard";

export const MyTestsPage = () => {
  return (
    <div className="flex h-full w-full flex-col bg-[#233652]">
      <div className="shrink-0 px-4 pt-3">
        <TasksOverview />
      </div>

      <section className="mx-3 mt-4 flex min-h-0 flex-1 flex-col rounded-t-[32px] bg-[var(--surface)] px-4 pt-3 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-28">
          <TestCard
            title="Испытание на сжатие"
            gost="ГОСТ Р 56812"
            author="Клименко О.Н."
            createdAt="18 мая"
          />

          <TestCard
            title="Испытание на растяжение"
            gost="ГОСТ 11262"
            author="Иванов А.А."
            createdAt="18 мая"
          />

          <TestCard
            title="Испытание на изгиб"
            gost="ГОСТ 56810"
            author="Петров И.И."
            createdAt="18 мая"
          />

          <TestCard
            title="Испытание на сжатие"
            gost="ГОСТ Р 56812"
            author="Клименко О.Н."
            createdAt="18 мая"
          />

          <TestCard
            title="Испытание на растяжение"
            gost="ГОСТ 11262"
            author="Иванов А.А."
            createdAt="18 мая"
          />

          <TestCard
            title="Испытание на изгиб"
            gost="ГОСТ 56810"
            author="Петров И.И."
            createdAt="18 мая"
          />
        </div>
      </section>
    </div>
  );
};