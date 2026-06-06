export const taskInformationVariants = {
  urgent: {
    container: "border border-[var(--color-accent)] bg-[var(--color-surface)]",

    iconBg: "var(--color-accent)",
    iconColor: "var(--color-surface)",

    titleColor: "#730b1c",
    descriptionColor: "var(--color-accent)",
  },

  material: {
    container: "bg-[var(--color-surface)]",

    iconBg: "var(--color-shell)",
    iconColor: "var(--color-surface)",

    titleColor: "var(--color-text-secondary)",
    descriptionColor: "var(--color-shell)",
  },

  document: {
    container: "bg-[var(--color-shell)]",

    iconBg: "var(--color-surface)",
    iconColor: "var(--color-shell)",

    titleColor: "var(--color-border)",
    descriptionColor: "var(--color-surface)",
  },
} as const;
