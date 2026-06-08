import { useState } from "react";
import { createTask } from "../api";

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

import { isModulusAvailable } from "../helpers/application";
import { ActionButton } from "../ui";
import { useApplicationForm } from "../hooks/useApplicationForm";

export const CreateApplicationPage = () => {
  const form = useApplicationForm();
  // FORM STATE

  // SHEETS
  const [isTestMethodSheetOpen, setIsTestMethodSheetOpen] = useState(false);
  const [isTemperatureSheetOpen, setIsTemperatureSheetOpen] = useState(false);
  const [isStandardSheetOpen, setIsStandardSheetOpen] = useState(false);

  // Test method & standard
  const handleOpenTestMethod = () => {
    setIsTestMethodSheetOpen(true);
  };
  const handleOpenStandard = () => {
    if (!form.selectedTestMethod) return;

    setIsStandardSheetOpen(true);
  };

  const handleAddTemperature = () => {
    setIsTemperatureSheetOpen(true);
  };
  // FORM SUBMISSION

  const handleCreateTask = async () => {
    if (
      !form.selectedTestMethod ||
      !form.selectedStandard ||
      form.temperatures.length === 0
    ) {
      alert(
        "Заполните испытание, стандарт и добавьте хотя бы одну температуру",
      );
      return;
    }
    const task = {
      creatorId: currentUser.id,
      type: form.documentType,
      number: form.documentType === "KPO" ? form.kpoNumber : undefined,
      materialName: form.materialName.trim(),
      topic: form.topic.trim() || undefined,
      testMethod: form.selectedTestMethod,
      standard: form.selectedStandard,
      temperatureConditions: form.temperatures.map((item) => ({
        temperature: item.temperature,
        quantity: item.quantity,
        modulus:
          form.selectedMethod &&
          isModulusAvailable(
            item.temperature,
            form.selectedMethod.modulusTemperatureMax,
          )
            ? item.modulus
            : false,
      })),
      isUrgent: form.isUrgent,
      urgentReason: form.isUrgent
        ? form.urgentReason.trim() || undefined
        : undefined,
      comment: form.comment.trim() || undefined,
    };

    try {
      await createTask(task);
      form.resetForm();
    } catch (error) {
      alert("Не удалось создать заявку");
      console.log(error);
    }
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <header className="px-6 pb-8 pt-14">
        <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
          Создание заявки
        </h1>
        <p className="mt-3 text-sm text-white/70">Заявка на испытание</p>
      </header>
      <main className="flex-1 overflow-y-auto rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pb-24 pt-6">
        <div className="flex flex-col gap-4">
          <DocumentSection
            documentType={form.documentType}
            kpoNumber={form.kpoNumber}
            onDocumentTypeChange={form.handleDocumentTypeChange}
            onKpoNumberChange={form.setKpoNumber}
          />
          <TopicSection
            topic={form.topic}
            onTopicChange={form.handleTopicChange}
            materialName={form.materialName}
            onMaterialNameChange={form.setMaterialName}
          />
          <TestMethodSection
            selectedTestMethod={form.selectedTestMethod}
            selectedStandard={form.selectedStandard}
            onOpenTestMethod={handleOpenTestMethod}
            onOpenStandard={handleOpenStandard}
          />
          <TemperatureSection
            temperatures={form.temperatures}
            selectedMethod={form.selectedMethod}
            onAddTemperature={handleAddTemperature}
            onDeleteTemperature={form.handleDeleteTemperature}
            onToggleModulus={form.handleToggleModulus}
          />
          <PrioritySection
            isUrgent={form.isUrgent}
            topic={form.topic}
            urgentReason={form.urgentReason}
            onUrgentChange={form.setIsUrgent}
            onUrgentReasonChange={form.setUrgentReason}
          />
          <CommentSection
            comment={form.comment}
            onCommentChange={form.setComment}
          />
          <ActionButton onClick={handleCreateTask}>Создать заявку</ActionButton>
        </div>
      </main>
      <TemperatureBottomSheet
        isOpen={isTemperatureSheetOpen}
        onClose={() => setIsTemperatureSheetOpen(false)}
        temperature={form.newTemperature}
        quantity={form.newQuantity}
        onTemperatureChange={form.setNewTemperature}
        onQuantityChange={form.setNewQuantity}
        onSave={form.handleSaveTemperature}
      />
      <TestMethodBottomSheet
        isOpen={isTestMethodSheetOpen}
        onClose={() => setIsTestMethodSheetOpen(false)}
        methods={form.testNames}
        onSelect={form.handleTestMethodSelect}
      />
      <StandardBottomSheet
        isOpen={isStandardSheetOpen}
        onClose={() => setIsStandardSheetOpen(false)}
        standards={form.availableStandards}
        onSelect={form.handleStandardSelect}
        selectedMethod={form.selectedTestMethod}
      />
    </div>
  );
};
