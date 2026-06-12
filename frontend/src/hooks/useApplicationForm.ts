import { useState } from "react";
import type { ApplicationTemperatureCondition } from "../types/application";
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
import type { ApplicationFormData } from "../schemas/applicationSchema";

export const useApplicationForm = () => {
  const testMethods = useReferenceStore((state) => state.testMethods);

  const [temperatures, setTemperatures] = useState<
    ApplicationTemperatureCondition[]
  >([]);
  const [selectedTestMethod, setSelectedTestMethod] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");

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
    setSelectedTestMethod("");
    setSelectedStandard("");
    setTemperatures([]);

    setNewTemperature("");
    setNewQuantity("");
  };

  const buildTaskPayload = (
    creatorId: string,
    formData: ApplicationFormData,
  ): TaskPayload => ({
    creatorId,
    type: formData.documentType,
    number: formData.documentType === "KPO" ? formData.kpoNumber : undefined,
    materialName: formData.materialName.trim(),
    topic: formData.topic.trim() || undefined,
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

    isUrgent: formData.isUrgent,
    urgentReason: formData.isUrgent
      ? formData.urgentReason.trim() || undefined
      : undefined,

    comment: formData.comment.trim() || undefined,
  });
  const fillForm = (task: Task) => {
    setSelectedTestMethod(task.testMethod);
    setSelectedStandard(task.standard);
    setTemperatures(task.temperatureConditions);
  };

  const getFormValues = (task: Task): ApplicationFormData => ({
    documentType: task.type,
    kpoNumber: task.number ?? "",
    materialName: task.materialName,
    topic: task.topic ?? "",
    isUrgent: task.isUrgent,
    urgentReason: task.urgentReason ?? "",
    comment: task.comment ?? "",
  });
  return {
    temperatures,
    selectedTestMethod,
    selectedStandard,

    newTemperature,
    newQuantity,

    testNames,
    availableStandards,
    selectedMethod,

    setNewTemperature,
    setNewQuantity,

    handleTestMethodSelect,
    handleStandardSelect,

    handleDeleteTemperature,
    handleToggleModulus,
    handleSaveTemperature,
    getFormValues,
    buildTaskPayload,
    resetForm,
    fillForm,
  };
};
