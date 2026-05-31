import { useState } from "react";
import {
  DocumentSection,
  TopicSection,
  TestMethodSection,
  PrioritySection,
  CommentSection,
  TemperatureSection,
} from "../features/application/ui";
import {
  StandardBottomSheet,
  TemperatureBottomSheet,
  TestMethodBottomSheet,
} from "../features/application/sheets";
import type {
  DocumentType,
  TemperatureCondition,
} from "../features/application/model/types";
import {
  isTemperatureUnique,
  isTemperatureAllowed,
  createTemperatureCondition,
} from "../features/application/model/helpers";
import {
  getTestNames,
  getAvailableStandards,
  getSelectedMethod,
} from "../features/application/model/selectors";

export const CreateApplicationPage = () => {
  // FORM STATE
  const [documentType, setDocumentType] = useState<DocumentType>("NTZ");
  const [temperatures, setTemperatures] = useState<TemperatureCondition[]>([]);
  const [selectedTestMethod, setSelectedTestMethod] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [kpoNumber, setKpoNumber] = useState("");
  const [topic, setTopic] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [urgentReason, setUrgentReason] = useState("");
  const [comment, setComment] = useState("");

  // TEMPERATURE FORM
  const [newTemperature, setNewTemperature] = useState("");
  const [newSamples, setNewSamples] = useState("");

  // SHEETS
  const [isTestMethodSheetOpen, setIsTestMethodSheetOpen] = useState(false);
  const [isTemperatureSheetOpen, setIsTemperatureSheetOpen] = useState(false);
  const [isStandardSheetOpen, setIsStandardSheetOpen] = useState(false);

  // SELECTORS
  const testNames = getTestNames();
  const selectedMethod = getSelectedMethod(
    selectedTestMethod,
    selectedStandard,
  );
  const availableStandards = getAvailableStandards(selectedTestMethod);

  //Document
  const handleDocumentTypeChange = (value: DocumentType) => {
    setDocumentType(value);

    if (value === "NTZ") {
      setKpoNumber("");
    }
  };

  //Topic
  const handleTopicChange = (value: string) => {
    setTopic(value);

    if (!value.trim()) {
      setIsUrgent(false);
      setUrgentReason("");
    }
  };

  // Test method & standard
  const handleOpenTestMethod = () => {
    setIsTestMethodSheetOpen(true);
  };
  const handleOpenStandard = () => {
    if (!selectedTestMethod) return;

    setIsStandardSheetOpen(true);
  };
  const handleTestMethodSelect = (value: string) => {
    setSelectedTestMethod(value);

    setSelectedStandard("");
    setTemperatures([]);
  };
  const handleStandardSelect = (value: string) => {
    setSelectedStandard(value);

    setTemperatures([]);
  };

  //Temperature
  const handleAddTemperature = () => {
    setIsTemperatureSheetOpen(true);
  };
  const handleDeleteTemperature = (id: number) => {
    setTemperatures((prev) => prev.filter((item) => item.id !== id));
  };
  const handleToggleModulus = (id: number, value: boolean) => {
    setTemperatures((prev) =>
      prev.map((item) => (item.id === id ? { ...item, modulus: value } : item)),
    );
  };
  const handleSaveTemperature = () => {
    if (!newTemperature.trim() || !newSamples.trim()) {
      return;
    }
    const temperature = Number(newTemperature);
    if (!isTemperatureUnique(temperatures, temperature)) {
      alert("Такая температура уже добавлена");
      setIsTemperatureSheetOpen(false);
      return;
    }
    if (!selectedMethod) {
      alert("Сначала выберите испытание и стандарт");
      return;
    }
    if (!isTemperatureAllowed(temperature, selectedMethod)) {
      alert(
        `Допустимый диапазон температур: ${selectedMethod.testTemperatureMin}°C ... ${selectedMethod.testTemperatureMax}°C`,
      );
      setIsTemperatureSheetOpen(false);
      return;
    }
    setTemperatures((prev) =>
      [
        ...prev,
        createTemperatureCondition(temperature, Number(newSamples)),
      ].sort((a, b) => a.temperature - b.temperature),
    );
    setNewTemperature("");
    setNewSamples("");
    setIsTemperatureSheetOpen(false);
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <header className="px-6 pt-14 pb-8">
        <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
          Создание заявки
        </h1>

        <p className="mt-3 text-sm text-white/70">Заявка на испытание</p>
      </header>

      <main className="flex-1 overflow-y-auto rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-6 pb-12">
        <div className="flex flex-col gap-4">
          <DocumentSection
            documentType={documentType}
            kpoNumber={kpoNumber}
            onDocumentTypeChange={handleDocumentTypeChange}
            onKpoNumberChange={setKpoNumber}
          />
          <TopicSection topic={topic} onTopicChange={handleTopicChange} />
          <TestMethodSection
            selectedTestMethod={selectedTestMethod}
            selectedStandard={selectedStandard}
            onOpenTestMethod={handleOpenTestMethod}
            onOpenStandard={handleOpenStandard}
          />
          <TemperatureSection
            temperatures={temperatures}
            selectedMethod={selectedMethod}
            onAddTemperature={handleAddTemperature}
            onDeleteTemperature={handleDeleteTemperature}
            onToggleModulus={handleToggleModulus}
          />
          <PrioritySection
            isUrgent={isUrgent}
            topic={topic}
            urgentReason={urgentReason}
            onUrgentChange={setIsUrgent}
            onUrgentReasonChange={setUrgentReason}
          />
          <CommentSection comment={comment} onCommentChange={setComment} />
          <button
            type="button"
            className="
              mt-4
              w-full
              rounded-[20px]
              bg-[var(--color-accent)]
              px-6
              py-4
              text-base
              font-semibold
              text-white
              transition
              active:brightness-90
            "
            style={{
              boxShadow: "0 8px 20px rgba(176, 16, 43, 0.25)",
            }}
          >
            Создать заявку
          </button>
        </div>
      </main>
      <TemperatureBottomSheet
        isOpen={isTemperatureSheetOpen}
        onClose={() => setIsTemperatureSheetOpen(false)}
        temperature={newTemperature}
        samples={newSamples}
        onTemperatureChange={setNewTemperature}
        onSamplesChange={setNewSamples}
        onSave={handleSaveTemperature}
      />
      <TestMethodBottomSheet
        isOpen={isTestMethodSheetOpen}
        onClose={() => setIsTestMethodSheetOpen(false)}
        methods={testNames}
        onSelect={handleTestMethodSelect}
      />
      <StandardBottomSheet
        isOpen={isStandardSheetOpen}
        onClose={() => setIsStandardSheetOpen(false)}
        standards={availableStandards}
        onSelect={handleStandardSelect}
      />
    </div>
  );
};
