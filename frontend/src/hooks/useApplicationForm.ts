import { useState } from "react";
import type {
  ApplicationTemperatureCondition,
  DocumentType,
} from "../types/application";
import {
  createTemperatureCondition,
  getAvailableStandards,
  getSelectedMethod,
  getTestNames,
  isTemperatureAllowed,
  isTemperatureUnique,
} from "../helpers/application";
import { isModulusAvailable } from "../helpers/application";
import type { Task } from "../types/task";
import { useReferenceStore } from "../store/referenceStore";
import type { TaskPayload } from "../types/taskPayload";

export const useApplicationForm = () => {
  const testMethods = useReferenceStore((state) => state.testMethods);

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
  const [newTemperature, setNewTemperature] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

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

  const handleDocumentTypeChange = (value: DocumentType) => {
    setDocumentType(value);
    if (value === "NTZ") {
      setKpoNumber("");
    }
  };

  const handleTopicChange = (value: string) => {
    setTopic(value);
    if (!value.trim()) {
      setIsUrgent(false);
      setUrgentReason("");
    }
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

  const handleDeleteTemperature = (temperature: number) => {
    setTemperatures((prev) =>
      prev.filter((item) => item.temperature !== temperature),
    );
  };

  const handleToggleModulus = (temperature: number, value: boolean) => {
    setTemperatures((prev) =>
      prev.map((item) =>
        item.temperature === temperature ? { ...item, modulus: value } : item,
      ),
    );
  };

  const handleSaveTemperature = () => {
    if (!newTemperature.trim() || !newQuantity.trim()) {
      return;
    }
    const temperature = Number(newTemperature);
    if (!isTemperatureUnique(temperatures, temperature)) {
      alert("Такая температура уже добавлена");
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
      return;
    }
    setTemperatures((prev) =>
      [
        ...prev,
        createTemperatureCondition(
          temperature,
          Number(newQuantity),
          selectedMethod?.defaultModulus,
        ),
      ].sort((a, b) => a.temperature - b.temperature),
    );
    setNewTemperature("");
    setNewQuantity("");
  };
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

  const buildTaskPayload = (creatorId: string): TaskPayload => ({
    creatorId,
    type: documentType,
    number: documentType === "KPO" ? kpoNumber : undefined,
    materialName: materialName.trim(),
    topic: topic.trim() || undefined,
    testMethod: selectedTestMethod,
    standard: selectedStandard,
    temperatureConditions: temperatures.map((item) => ({
      temperature: item.temperature,
      quantity: item.quantity,
      modulus:
        selectedMethod &&
        isModulusAvailable(
          item.temperature,
          selectedMethod.modulusTemperatureMax,
        )
          ? item.modulus
          : false,
    })),

    isUrgent,
    urgentReason: isUrgent ? urgentReason.trim() || undefined : undefined,
    comment: comment.trim() || undefined,
  });
  const fillForm = (task: Task) => {
    setDocumentType(task.type);
    setKpoNumber(task.number);

    setMaterialName(task.materialName);

    setTopic(task.topic ?? "");

    setSelectedTestMethod(task.testMethod);
    setSelectedStandard(task.standard);

    setTemperatures(task.temperatureConditions);

    setIsUrgent(task.isUrgent);
    setUrgentReason(task.urgentReason ?? "");

    setComment(task.comment ?? "");
  };
  return {
    documentType,
    temperatures,
    selectedTestMethod,
    selectedStandard,

    kpoNumber,
    topic,
    materialName,

    isUrgent,
    urgentReason,
    comment,

    newTemperature,
    newQuantity,

    testNames,
    availableStandards,
    selectedMethod,

    setDocumentType,
    setKpoNumber,
    setMaterialName,
    setUrgentReason,
    setComment,

    setNewTemperature,
    setNewQuantity,
    setIsUrgent,

    handleDocumentTypeChange,
    handleTopicChange,

    handleTestMethodSelect,
    handleStandardSelect,

    handleDeleteTemperature,
    handleToggleModulus,
    handleSaveTemperature,

    buildTaskPayload,
    resetForm,
    fillForm,
  };
};
