import { useState, useEffect } from "react";
import { createTask, getTestMethods } from "../api";

import { currentUser } from "../data/user/currentUser";
import {
  DocumentSection,
  TopicSection,
  TestMethodSection,
  PrioritySection,
  CommentSection,
  TemperatureSection,
  StandardBottomSheet,
  TemperatureBottomSheet,
  TestMethodBottomSheet,
} from "../components/application";

import type {
  DocumentType,
  ApplicationTemperatureCondition,
  TestMethod,
} from "../types/application";
import {
  isTemperatureUnique,
  isTemperatureAllowed,
  createTemperatureCondition,
  getTestNames,
  getAvailableStandards,
  getSelectedMethod,
} from "../helpers/application";

export const CreateApplicationPage = () => {
  // FORM STATE
  const [testMethods, setTestMethods] = useState<TestMethod[]>([]);
  useEffect(() => {
    getTestMethods().then(setTestMethods);
  }, []);
  const [documentType, setDocumentType] = useState<DocumentType>("NTZ");
  const [temperatures, setTemperatures] = useState<
    ApplicationTemperatureCondition[]
  >([]);
  const [selectedTestMethod, setSelectedTestMethod] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [kpoNumber, setKpoNumber] = useState("");
  const [topic, setTopic] = useState("");
  const [materialName, setMaterialName] = useState("");
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
  const testNames = getTestNames(testMethods);
  const selectedMethod = getSelectedMethod(
    testMethods,
    selectedTestMethod,
    selectedStandard,
  );
  const availableStandards = getAvailableStandards(
    testMethods,
    selectedTestMethod,
  );

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
    if (!selectedTestMethod || !selectedStandard) {
      alert("Сначала выберите испытание и стандарт");
      return;
    }
    if (selectedMethod && !isTemperatureAllowed(temperature, selectedMethod)) {
      alert(
        `Допустимый диапазон температур: ${selectedMethod.testTemperatureMin}°C ... ${selectedMethod.testTemperatureMax}°C`,
      );
      setIsTemperatureSheetOpen(false);
      return;
    }
    setTemperatures((prev) =>
      [
        ...prev,
        createTemperatureCondition(
          temperature,
          Number(newSamples),
          selectedMethod?.defaultModulus,
        ),
      ].sort((a, b) => a.temperature - b.temperature),
    );
    setNewTemperature("");
    setNewSamples("");
    setIsTemperatureSheetOpen(false);
  };

  // FORM SUBMISSION
  const resetForm = () => {
    setDocumentType("NTZ");
    setKpoNumber("");
    setMaterialName("");
    setTopic("");
    setSelectedTestMethod("");
    setSelectedStandard("");
    setTemperatures([]);
    setIsUrgent(false);
    setUrgentReason("");
    setComment("");
  };

  const handleCreateTask = async () => {
    if (!selectedTestMethod || !selectedStandard || temperatures.length === 0) {
      alert(
        "Заполните испытание, стандарт и добавьте хотя бы одну температуру",
      );
      return;
    }
    const task = {
      creatorId: currentUser.id,
      type: documentType,
      number: documentType === "KPO" ? kpoNumber : undefined,
      materialName: materialName.trim(),
      topic: topic.trim() || undefined,
      testMethod: selectedTestMethod,
      standard: selectedStandard,
      temperatureConditions: temperatures.map((item) => ({
        temperature: item.temperature,
        quantity: item.samples,
        modulus: item.modulus,
      })),
      isUrgent,
      urgentReason: isUrgent ? urgentReason.trim() || undefined : undefined,
      comment: comment.trim() || undefined,
    };

    try {
      await createTask(task);
      resetForm();
    } catch (error) {
      alert("Не удалось создать заявку");
      console.log(error);
    }
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <header className="px-6 pt-14 pb-8">
        <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
          Создание заявки
        </h1>
        <p className="mt-3 text-sm text-white/70">Заявка на испытание</p>
      </header>
      <main className="flex-1 overflow-y-auto rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-6 pb-24">
        <div className="flex flex-col gap-4">
          <DocumentSection
            documentType={documentType}
            kpoNumber={kpoNumber}
            onDocumentTypeChange={handleDocumentTypeChange}
            onKpoNumberChange={setKpoNumber}
          />
          <TopicSection
            topic={topic}
            onTopicChange={handleTopicChange}
            materialName={materialName}
            onMaterialNameChange={setMaterialName}
          />
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
            onClick={handleCreateTask}
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
        selectedMethod={selectedTestMethod}
      />
    </div>
  );
};
