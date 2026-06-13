type ErrorModalProps = {
  message: string;
  title?: string;
  onClose: () => void;
};

export const ErrorModal = ({ message, title, onClose }: ErrorModalProps) => {
  const header = title ?? "Ошибка";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-md rounded-lg bg-white p-6">
        <h3 className="mb-2 text-lg font-semibold">{header}</h3>
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">{message}</p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] bg-[var(--color-accent)] px-4 py-2 text-white"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
