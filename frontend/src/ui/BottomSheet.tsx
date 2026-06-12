import { motion, useMotionValue } from "framer-motion";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;

  title: string;
  subtitle?: string;

  children: React.ReactNode;
};

export const BottomSheet = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: BottomSheetProps) => {
  const y = useMotionValue(0);
  return (
    <motion.div
      className="fixed inset-0 z-50"
      animate={{
        backgroundColor: isOpen ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.2 }}
      style={{
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        style={{ y }}
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 9999,
        }}
        dragDirectionLock
        onDrag={(_, info) => {
          if (info.offset.y < 0) {
            y.set(0);
          }
        }}
        dragElastic={0.1}
        dragSnapToOrigin
        initial={false}
        animate={{
          y: isOpen ? 0 : "100%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 700) {
            onClose();
          }
        }}
        className="absolute bottom-0 left-0 right-0 flex max-h-[65dvh] flex-col rounded-t-[32px] bg-[var(--color-surface)] px-6 pb-8 pt-4"
      >
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-[var(--color-border)]" />

        <h2 className="text-center text-2xl font-semibold">{title}</h2>

        {subtitle && (
          <p className="mt-1 text-center text-sm text-[var(--color-text-secondary)]">
            {subtitle}
          </p>
        )}

        <div className="mt-4 flex-1 overflow-y-auto">{children}</div>
      </motion.div>
    </motion.div>
  );
};
