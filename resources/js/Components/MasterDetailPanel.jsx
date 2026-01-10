import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  hover: { scale: 1.01, y: -4, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function MasterDetailPanel({
  items = [],
  getKey,
  selectedItem,
  onSelect,
  renderItemSummary,
  renderDetail,
  defaultSelectFirst = true,
  reduceMotion: reduceMotionProp,
  leftHeaderTitle = "Daftar",
  leftHeaderExtras,
  emptyLabel = "Tidak ada data",
  classNameLeft = "",
  classNameRight = "",
}) {
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [internalSelected, setInternalSelected] = useState(null);
  const isControlled = typeof selectedItem !== "undefined" && typeof onSelect === "function";
  const activeItem = isControlled ? selectedItem : internalSelected;

  useEffect(() => {
    if (!defaultSelectFirst) return;
    if (items && items.length > 0 && !activeItem) {
      if (isControlled) onSelect(items[0]);
      else setInternalSelected(items[0]);
    }
  }, [items]);

  const handleSelect = (item) => {
    if (isControlled) onSelect(item);
    else setInternalSelected(item);
  };

  const keyOf = (item, idx) => {
    if (typeof getKey === "function") return getKey(item, idx);
    return item?.id ?? item?.key ?? String(idx);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial={reduceMotionProp ?? reduceMotion ? false : "hidden"}
      animate={reduceMotionProp ?? reduceMotion ? false : "visible"}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      <motion.div
        variants={itemVariants}
        className={`relative bg-white/95 dark:bg-gray-900/85 rounded-2xl shadow-xl shadow-blue-500/5 overflow-hidden border border-gray-200/70 dark:border-gray-800 col-span-12 lg:col-span-5 ${classNameLeft}`}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
        <div className="relative z-[1]">
          <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm flex flex-col gap-2">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {leftHeaderTitle}
              </h3>
              {leftHeaderExtras}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-360px)]">
            <AnimatePresence mode="wait">
              {(!items || items.length === 0) ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center text-gray-500">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-lg font-medium">{emptyLabel}</p>
                </motion.div>
              ) : (
                <motion.div variants={containerVariants} initial={reduceMotionProp ?? reduceMotion ? false : "hidden"} animate={reduceMotionProp ?? reduceMotion ? false : "visible"} className="p-4 space-y-3">
                  {items.map((item, idx) => (
                    <motion.div
                      key={keyOf(item, idx)}
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => handleSelect(item)}
                      className={`relative p-4 rounded-xl cursor-pointer transition-all border ${activeItem === item ? "border-blue-600 bg-blue-50/60" : "border-gray-200 dark:border-gray-700 hover:border-gray-300"}`}
                    >
                      {typeof renderItemSummary === "function" ? renderItemSummary(item) : (
                        <div className="text-sm text-gray-700 dark:text-gray-300">Item</div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={`relative bg-white/95 dark:bg-gray-900/85 rounded-2xl shadow-xl shadow-blue-500/5 overflow-hidden border border-gray-200/70 dark:border-gray-800 col-span-12 lg:col-span-7 ${classNameRight}`}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
        <div className="relative z-[1]">
          <div className="flex-1">
            {typeof renderDetail === "function" ? renderDetail(activeItem) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

