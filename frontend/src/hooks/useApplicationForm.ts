import { useEffect, useState } from "react";

import { getTestMethods } from "../api";

import type {
  ApplicationTemperatureCondition,
  DocumentType,
  TestMethod,
} from "../types/application";

import {
  createTemperatureCondition,
  getAvailableStandards,
  getSelectedMethod,
  getTestNames,
  isTemperatureAllowed,
  isTemperatureUnique,
} from "../helpers/application";

export const useApplicationForm = () => {
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

    resetForm,
  };
};
