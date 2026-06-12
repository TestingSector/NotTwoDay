type TasksSearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function TasksSearchBar({
  search,
  onSearchChange,
}: TasksSearchBarProps) {
  return (
    <div className="mt-4">
      <input
        value={search}
        onBlur={() => {
          // Safari keyboard scroll workaround
          window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
        }}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск задачи..."
        className="w-full rounded-[18px] border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
      />
    </div>
  );
}
