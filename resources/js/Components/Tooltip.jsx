import React, { useState, useRef, useEffect } from "react";

export default function Tooltip({ content, placement = "top", children, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = 8;
    let top = rect.top - gap;
    let left = rect.left + rect.width / 2;
    if (placement === "bottom") top = rect.bottom + gap;
    if (placement === "left") {
      top = rect.top + rect.height / 2;
      left = rect.left - gap;
    }
    if (placement === "right") {
      top = rect.top + rect.height / 2;
      left = rect.right + gap;
    }
    setPos({ top, left });
  }, [open, placement]);

  return (
    <span ref={ref} className={`relative inline-flex ${className}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && (
        <span
          className="fixed z-[10000] px-3 py-2 text-xs rounded-md bg-gray-900 text-white shadow-lg"
          style={{ top: pos.top, left: pos.left, transform: placement === "top" || placement === "bottom" ? "translateX(-50%)" : "translateY(-50%)" }}
        >
          {content}
        </span>
      )}
    </span>
  );
}

