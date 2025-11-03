import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Toast from "./Toast";

export default function Toaster({ toasts = [], onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div key={t.id} layout className="pointer-events-auto">
            <Toast
              id={t.id}
              type={t.type}
              title={t.title}
              message={t.message}
              duration={t.duration}
              onClose={() => onRemove?.(t.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}