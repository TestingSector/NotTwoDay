import { useMemo } from "react";

import {
  createTemperatureCondition,
  getAvailableStandards,
  getSelectedMethod,
  isTemperatureAllowed,
  isTemperatureUnique,
} from "../helpers/application";
import { isModulusAvailable } from "../helpers/application";
import { useReferenceStore } from "../store/referenceStore";
import type { TaskPayload } from "../types/taskPayload";
import type { ApplicationFormData } from "../schemas/applicationSchema";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";

export const useApplicationForm = (
  setValue: UseFormSetValue<ApplicationFormData>,
  watch: UseFormWatch<ApplicationFormData>,
) => {
  const testMethods = useReferenceStore((state) => state.testMethods);

  const selectedTestMethod = watch("selectedTestMethod");
  const selectedStandard = watch("selectedStandard");
  const temperatures = watch("temperatures");
  const draftTemperature = watch("draftTemperature");
  const draftQuantity = watch("draftQuantity");
  const customTestMethod = watch("customTestMethod");
  const customStandard = watch("customStandard");

  const selectedMethod = useMemo(
    () => getSelectedMethod(testMethods, selectedTestMethod, selectedStandard),
    [testMethods, selectedStandard, selectedTestMethod],
  );

  const availableStandards = useMemo(
    () => getAvailableStandards(testMethods, selectedTestMethod),
    [testMethods, selectedTestMethod],
  );

  const handleDeleteTemperature = (temperature: number) => {
    setValue(
      "temperatures",
      temperatures.filter((item) => item.temperature !== temperature),
      { shouldValidate: true },
    );
  };

  const handleToggleModulus = (temperature: number, value: boolean) => {
    setValue(
      "temperatures",
      temperatures.map((item) =>
        item.temperature === temperature ? { ...item, modulus: value } : item,
      ),
      { shouldValidate: true },
    );
  };

  // Возвращает `true` при успешном добавлении, или строку с сообщением ошибки
  const handleSaveTemperature = (): true | string => {
    const temperatureValue = draftTemperature?.trim() ?? "";
    const quantityValue = draftQuantity?.trim() ?? "";

    if (!temperatureValue || !quantityValue) {
      if (!temperatureValue && !quantityValue) {
        return "Введите температуру и количество образцов";
      }
      if (!temperatureValue) return "Введите температуру";
      return "Введите количество образцов";
    }

    const temperature = Number(temperatureValue);

    if (!isTemperatureUnique(temperatures, temperature)) {
      return "Такая температура уже добавлена";
    }

    if (!selectedTestMethod || !selectedStandard) {
      if (!selectedTestMethod && !selectedStandard) {
        return "Выберите испытание и стандарт";
      }
      if (!selectedTestMethod) return "Выберите испытание";
      return "Выберите стандарт";
    }

    if (selectedMethod && !isTemperatureAllowed(temperature, selectedMethod)) {
      return `Допустимый диапазон температур: ${selectedMethod.testTemperatureMin}°C ... ${selectedMethod.testTemperatureMax}°C`;
    }

    const updatedTemperatures = [
      ...temperatures,
      createTemperatureCondition(
        temperature,
        Number(quantityValue),
        selectedMethod?.defaultModulus,
      ),
    ].sort((a, b) => a.temperature - b.temperature);

    setValue("temperatures", updatedTemperatures, { shouldValidate: true });

    // очистка полей оставляем на родительской странице (там закрывают шторку и показывают модал)
    return true;
  };

  const setDraftTemperature = (value: string) =>
    setValue("draftTemperature", value, { shouldValidate: false });
  const setDraftQuantity = (value: string) =>
    setValue("draftQuantity", value, { shouldValidate: false });
  const setCustomTestMethod = (value: string) =>
    setValue("customTestMethod", value, { shouldValidate: false });
  const setCustomStandard = (value: string) =>
    setValue("customStandard", value, { shouldValidate: false });

  const resetCustomDrafts = () => {
    setValue("customTestMethod", "", { shouldValidate: false });
    setValue("customStandard", "", { shouldValidate: false });
  };

  const selectTestMethod = (value: string) => {
    setValue("selectedTestMethod", value, { shouldValidate: true });
    setValue("selectedStandard", "", { shouldValidate: true });
    resetCustomDrafts();
  };

  const selectStandard = (value: string) => {
    setValue("selectedStandard", value, { shouldValidate: true });
    setCustomStandard("");
  };

  const resetForm = () => {
    setValue("temperatures", [], {
      shouldValidate: true,
    });

    setValue("draftTemperature", "", { shouldValidate: false });
    setValue("draftQuantity", "", { shouldValidate: false });
    resetCustomDrafts();
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
    testMethod: formData.selectedTestMethod,
    standard: formData.selectedStandard,
    temperatureConditions: formData.temperatures.map((item) => ({
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

  return {
    availableStandards,
    selectedMethod,
    selectedStandard,
    selectedTestMethod,
    temperatures,
    draftTemperature,
    draftQuantity,
    customTestMethod,
    customStandard,
    setDraftTemperature,
    setDraftQuantity,
    setCustomTestMethod,
    setCustomStandard,
    selectTestMethod,
    selectStandard,
    handleDeleteTemperature,
    handleToggleModulus,
    handleSaveTemperature,
    buildTaskPayload,
    resetForm,
  };
};
