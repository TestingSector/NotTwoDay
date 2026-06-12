import { useEffect, useState } from "react";
import { currentUser } from "../data/user/currentUser";
import { useNavigate, useParams } from "react-router-dom";
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
    formState: { errors, isValid },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    defaultValues: {
      documentType: "NTZ",
      kpoNumber: "",
      materialName: "",
      topic: "",
      isUrgent: false,
      urgentReason: "",
      comment: "",
    },
  });

  const isEditMode = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const createTask = useTasksStore((state) => state.createTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const config = pageConfig[mode];

  const form = useApplicationForm();

  useEffect(() => {
    if (!isEditMode || !id) return;

    getTask(id).then((task) => {
      form.fillForm(task);

      reset(form.getFormValues(task));
    });
  }, [id, isEditMode, form, reset]);

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

  const onSubmit = async (data: ApplicationFormData) => {
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

    const payload = form.buildTaskPayload(currentUser.id, data);

    try {
      if (!isEditMode) {
        await createTask(payload);
        form.resetForm();
        reset();
        return;
      }

      if (!id) return;
      await updateTask(id, payload);
      navigate(-1);
    } catch (error) {
      console.error(error);

      alert(
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
      <main className="flex-1 overflow-y-auto rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pb-24 pt-6">
        <div className="flex flex-col gap-4">
          <DocumentSection
            control={control}
            register={register}
            watch={watch}
            errors={errors}
            isDocumentTypeDisabled={isEditMode}
          />
          <TopicSection register={register} errors={errors} />
          <TestMethodSection
            selectedTestMethod={form.selectedTestMethod}
            selectedStandard={form.selectedStandard}
            onOpenTestMethod={handleOpenTestMethod}
            onOpenStandard={handleOpenStandard}
            disabled={isEditMode}
          />
          <TemperatureSection
            temperatures={form.temperatures}
            selectedMethod={form.selectedMethod}
            onAddTemperature={handleAddTemperature}
            onDeleteTemperature={form.handleDeleteTemperature}
            onToggleModulus={form.handleToggleModulus}
          />
          <PrioritySection
            control={control}
            register={register}
            watch={watch}
            errors={errors}
          />
          <CommentSection
            register={register}
            errors={errors}
            isCommentSectionDisabled={isEditMode}
          />
          <ActionButton onClick={handleSubmit(onSubmit)} disabled={!isValid}>
            {config.submitText}
          </ActionButton>
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
