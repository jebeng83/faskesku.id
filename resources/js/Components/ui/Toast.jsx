import React, { useEffect } from "react";
import { motion } from "framer-motion";

const typeStyles = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    iconBg: "bg-emerald-100",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    iconBg: "bg-red-100",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    iconBg: "bg-yellow-100",
  },
  info: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-800",
    iconBg: "bg-sky-100",
  },
};

export default function Toast({ id, type = "success", title, message, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const styles = typeStyles[type] || typeStyles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className={`pointer-events-auto w-80 rounded-md border ${styles.border} ${styles.bg} shadow-lg ring-1 ring-black/5`}
    >
      <div className="p-3">
        <div className="flex items-start gap-3">
          <div className={`h-8 w-8 rounded-md ${styles.iconBg} flex items-center justify-center`}></div>
          <div className="flex-1">
            {title && <div className={`text-sm font-semibold ${styles.text}`}>{title}</div>}
            {message && <div className="mt-0.5 text-xs text-gray-700">{message}</div>}
          </div>
          <button
            type="button"
            onClick={() => onClose?.(id)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    </motion.div>
  );
}