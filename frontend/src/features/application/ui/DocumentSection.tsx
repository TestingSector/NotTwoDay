import { ApplicationCard } from "../../../widgets/ApplicationCard";
import type { DocumentType } from "../model/types";

interface Props {
  documentType: DocumentType;
  kpoNumber: string;

  onDocumentTypeChange: (value: DocumentType) => void;
  onKpoNumberChange: (value: string) => void;
}

export const DocumentSection = ({
  documentType,
  kpoNumber,
  onDocumentTypeChange,
  onKpoNumberChange,
}: Props) => {
  return (
    <ApplicationCard title="Документ">
      <div className="flex gap-2">
        <button
          onClick={() => onDocumentTypeChange("NTZ")}
          className={`flex-1 rounded-[18px] px-4 py-3 text-sm font-medium transition ${
            documentType === "NTZ"
              ? "bg-[var(--color-accent)] text-white"
              : "border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
          }`}
        >
          НТЗ
        </button>

        <button
          onClick={() => onDocumentTypeChange("KPO")}
          className={`flex-1 rounded-[18px] px-4 py-3 text-sm font-medium transition ${
            documentType === "KPO"
              ? "bg-[var(--color-accent)] text-white"
              : "border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
          }`}
        >
          КПО
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          documentType === "KPO"
            ? "mt-4 max-h-32 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">
          Номер КПО
        </label>

        <input
          value={kpoNumber}
          onChange={(e) => onKpoNumberChange(e.target.value)}
          placeholder="Введите номер КПО"
          className="
            w-full
            rounded-[18px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-secondary)]
            px-4
            py-3
            outline-none
          "
        />
      </div>
    </ApplicationCard>
  );
};
