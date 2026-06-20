import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "../types/task";
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
import { getTestNames } from "../helpers/application";
import { useReferenceStore } from "../store/referenceStore";
import { ActionButton } from "../ui";
import { useApplicationForm } from "../hooks/useApplicationForm";
import { useTasksStore } from "../store/tasksStore";
import { getTask } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationSchema,
  type ApplicationFormData,
} from "../schemas/applicationSchema";
import { toast } from "sonner";
import axios from "axios";

type ApplicationFormPageProps = {
  mode: "create" | "edit";
};
const pageConfig = {
  create: {
    title: "Создание заявки",
    subtitle: "Заявка на испытание",
    submitText: "Создать заявку",
  },
  edit: {
    title: "Редактирование заявки",
    subtitle: "Изменение параметров заявки",
    submitText: "Сохранить изменения",
  },
};

export const ApplicationFormPage = ({ mode }: ApplicationFormPageProps) => {
  const {
    register,
    watch,
    control,
    reset,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    defaultValues: {
      documentType: "NTZ",
      kpoNumber: "",
      draftTemperature: "",
      draftQuantity: "",
      customTestMethod: "",
      customStandard: "",
      isCustomTestMethod: false,
      isCustomStandard: false,
      materialName: "",
      topic: "",
      isUrgent: false,
      urgentReason: "",
      comment: "",
      selectedTestMethod: "",
      selectedStandard: "",
      temperatures: [],
    },
  });
  // eslint-disable-next-line react-hooks/incompatible-library
  const isUrgent = watch("isUrgent");

  useEffect(() => {
    if (!isUrgent) {
      setValue("urgentReason", "");
    }
  }, [isUrgent, setValue]);
  const isEditMode = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();
  const testMethods = useReferenceStore((state) => state.testMethods);
  const testNames = getTestNames(testMethods);
  const createTask = useTasksStore((state) => state.createTask);
  const updateTask = useTasksStore((state) => state.updateTask);

  const config = pageConfig[mode];
  const form = useApplicationForm(setValue, watch, setError);
  const {
    selectedTestMethod,
    selectedStandard,
    temperatures,
    selectedMethod,
    availableStandards,
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
  } = form;

  const getFormValues = (task: Task): ApplicationFormData => ({
    documentType: task.type,
    kpoNumber: task.number ?? "",
    draftTemperature: "",
    draftQuantity: "",
    customTestMethod: "",
    customStandard: "",
    isCustomTestMethod: false,
    isCustomStandard: false,
    materialName: task.materialName,
    topic: task.topic ?? "",
    isUrgent: task.isUrgent,
    urgentReason: task.urgentReason ?? "",
    comment: task.comment ?? "",
    selectedTestMethod: task.testMethod,
    selectedStandard: task.standard,
    temperatures: task.temperatureConditions,
  });

  useEffect(() => {
    if (!isEditMode || !id) return;

    getTask(id).then((task) => {
      reset(getFormValues(task));
    });
  }, [id, isEditMode, reset]);

  // SHEETS
  const [isTestMethodSheetOpen, setIsTestMethodSheetOpen] = useState(false);
  const [isTemperatureSheetOpen, setIsTemperatureSheetOpen] = useState(false);
  const [isStandardSheetOpen, setIsStandardSheetOpen] = useState(false);

  // Test method & standard
  const handleOpenTestMethod = () => {
    setIsTestMethodSheetOpen(true);
  };
  const handleOpenStandard = () => {
    if (!selectedTestMethod) return;

    setIsStandardSheetOpen(true);
  };

  const handleAddTemperature = () => {
    setIsTemperatureSheetOpen(true);
  };

  const handleSaveTemperatureSheet = () => {
    const result = handleSaveTemperature();

    if (result.success) {
      setDraftTemperature("");
      setDraftQuantity("");
      clearErrors(["draftTemperature", "draftQuantity"]);
      setIsTemperatureSheetOpen(false);
      return;
    }

    if (!result.modal) {
      return;
    }

    setDraftTemperature("");
    setDraftQuantity("");
    clearErrors(["draftTemperature", "draftQuantity"]);
    setIsTemperatureSheetOpen(false);
    setTimeout(() => toast.error(result.message), 40);
  };

  const handleSelectTestMethod = (value: string, isCustom = false) => {
    selectTestMethod(value, isCustom);
    setCustomTestMethod("");
    clearErrors(["selectedTestMethod", "selectedStandard"]);
    setIsTestMethodSheetOpen(false);
  };

  const handleSelectStandard = (value: string, isCustom = false) => {
    selectStandard(value, isCustom);
    setCustomStandard("");
    clearErrors(["selectedStandard"]);
    setIsStandardSheetOpen(false);
  };
  // FORM SUBMISSION

  const onSubmit = async (data: ApplicationFormData) => {
    const payload = buildTaskPayload(data);

    try {
      if (!isEditMode) {
        await createTask(payload);

        toast.success("Заявка создана");

        resetForm();
        reset();
        navigate(-1);
        return;
      }

      if (!id) return;

      await updateTask(id, payload);

      toast.success("Изменения сохранены");

      navigate(-1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        return;
      }

      toast.error(
        isEditMode ? "Не удалось обновить заявку" : "Не удалось создать заявку",
      );
    }
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <header className="px-6 pb-8 pt-14">
        <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
          {config.title}
        </h1>
        <p className="mt-3 text-sm text-white/70">{config.subtitle}</p>
      </header>
      <main
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pb-24 pt-6"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DocumentSection
            control={control}
            register={register}
            watch={watch}
            errors={errors}
            isDocumentTypeDisabled={isEditMode}
          />
          <TopicSection register={register} errors={errors} />
          <TestMethodSection
            selectedTestMethod={selectedTestMethod}
            selectedStandard={selectedStandard}
            errors={errors}
            onOpenTestMethod={handleOpenTestMethod}
            onOpenStandard={handleOpenStandard}
            disabled={isEditMode}
          />
          <TemperatureSection
            temperatures={temperatures}
            selectedMethod={selectedMethod}
            onAddTemperature={handleAddTemperature}
            onDeleteTemperature={handleDeleteTemperature}
            onToggleModulus={handleToggleModulus}
            errors={errors}
            disabled={!selectedTestMethod || !selectedStandard}
          />
          <PrioritySection
            control={control}
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
          />
          <CommentSection
            register={register}
            errors={errors}
            isCommentSectionDisabled={isEditMode}
          />

          <ActionButton type="submit">{config.submitText}</ActionButton>
        </form>
      </main>
      <TemperatureBottomSheet
        isOpen={isTemperatureSheetOpen}
        onClose={() => setIsTemperatureSheetOpen(false)}
        temperature={draftTemperature}
        quantity={draftQuantity}
        onTemperatureChange={setDraftTemperature}
        onQuantityChange={setDraftQuantity}
        onSave={handleSaveTemperatureSheet}
        temperatureError={errors.draftTemperature?.message}
        quantityError={errors.draftQuantity?.message}
      />
      <TestMethodBottomSheet
        isOpen={isTestMethodSheetOpen}
        onClose={() => setIsTestMethodSheetOpen(false)}
        methods={testNames}
        customMethod={customTestMethod ?? ""}
        setCustomMethod={setCustomTestMethod}
        onSelect={(value, isCustom) => handleSelectTestMethod(value, isCustom)}
      />
      <StandardBottomSheet
        isOpen={isStandardSheetOpen}
        onClose={() => setIsStandardSheetOpen(false)}
        standards={availableStandards}
        customStandard={customStandard ?? ""}
        setCustomStandard={setCustomStandard}
        onSelect={(value, isCustom) => handleSelectStandard(value, isCustom)}
        selectedMethod={selectedTestMethod}
      />
    </div>
  );
};
