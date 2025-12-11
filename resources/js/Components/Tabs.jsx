import React from "react";

export default function Tabs({ tabs = [], active, onChange = () => {}, variant = "underline", size = "md", className = "" }) {
  const sizes = {
    sm: "text-xs py-2 px-3",
    md: "text-sm py-2.5 px-4",
    lg: "text-base py-3 px-5",
  };
  const sz = sizes[size] || sizes.md;
  const isUnderline = variant === "underline";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {tabs.map((t) => {
        const isActive = active === t.id;
        const base = "rounded-md transition-colors";
        const underline = isActive ? "border-b-2 border-teal-500 text-teal-600" : "border-b-2 border-transparent text-gray-600 hover:text-gray-800";
        const pill = isActive ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200";
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`${sz} ${base} ${isUnderline ? underline : pill}`}
          >
            <span className="inline-flex items-center gap-2">
              {t.icon}
              <span>{t.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

