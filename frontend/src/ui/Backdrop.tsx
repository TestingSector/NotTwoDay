import { motion } from "framer-motion";

type BackdropProps = {
  isOpen?: boolean;
  onClick?: () => void;
  opacity?: number;
  children?: React.ReactNode;
  className?: string;
};

export const Backdrop = ({
  isOpen = true,
  onClick,
  opacity = 0.4,
  children,
  className = "",
}: BackdropProps) => {
  return (
    <motion.div
      className={`fixed inset-0 z-50 ${className}`}
      animate={{
        backgroundColor: isOpen ? `rgba(0,0,0,${opacity})` : "rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.2 }}
      style={{
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
