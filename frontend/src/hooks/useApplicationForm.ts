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
import type { UseFormSetValue, UseFormWatch, UseFormSetError } from "react-hook-form";

export const useApplicationForm = (
  setValue: UseFormSetValue<ApplicationFormData>,
  watch: UseFormWatch<ApplicationFormData>,
  setError: UseFormSetError<ApplicationFormData>,
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

  type SaveResult =
    | { success: true }
    | { success: false; modal: false }
    | { success: false; modal: true; message: string };

  const handleSaveTemperature = (): SaveResult => {
    const temperatureValue = draftTemperature?.trim() ?? "";
    const quantityValue = draftQuantity?.trim() ?? "";

    if (!temperatureValue || !quantityValue) {
      if (!temperatureValue) {
        setError("draftTemperature", {
          type: "required",
          message: "Введите температуру",
        });
      }
      if (!quantityValue) {
        setError("draftQuantity", {
          type: "required",
          message: "Введите количество образцов",
        });
      }

      return { success: false, modal: false };
    }

    const temperature = Number(temperatureValue);

    if (!isTemperatureUnique(temperatures, temperature)) {
      return { success: false, modal: true, message: "Такая температура уже добавлена" };
    }

    if (!selectedTestMethod || !selectedStandard) {
      if (!selectedTestMethod) {
        setError("selectedTestMethod", {
          type: "required",
          message: "Выберите испытание",
        });
      }
      if (!selectedStandard) {
        setError("selectedStandard", {
          type: "required",
          message: "Выберите стандарт",
        });
      }

      return { success: false, modal: false };
    }

    if (selectedMethod && !isTemperatureAllowed(temperature, selectedMethod)) {
      return {
        success: false,
        modal: true,
        message: `Допустимый диапазон температур: ${selectedMethod.testTemperatureMin}°C ... ${selectedMethod.testTemperatureMax}°C`,
      };
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

    return { success: true };
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
    setValue("isCustomTestMethod", false, { shouldValidate: false });
    setValue("isCustomStandard", false, { shouldValidate: false });
  };

  const selectTestMethod = (value: string, isCustom = false) => {
    setValue("selectedTestMethod", value, { shouldValidate: true });
    setValue("selectedStandard", "", { shouldValidate: true });
    setValue("isCustomTestMethod", isCustom, { shouldValidate: false });
    resetCustomDrafts();
  };

  const selectStandard = (value: string, isCustom = false) => {
    setValue("selectedStandard", value, { shouldValidate: true });
    setValue("isCustomStandard", isCustom, { shouldValidate: false });
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
