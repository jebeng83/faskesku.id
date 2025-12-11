import React from "react";

export default function Spinner({ size = "md", variant = "primary", className = "" }) {
  const sizes = {
    xs: "h-4 w-4",
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };
  const colors = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-600",
    info: "text-purple-600",
    teal: "text-teal-600",
  };
  const sz = sizes[size] || sizes.md;
  const color = colors[variant] || colors.primary;
  return (
    <svg className={`animate-spin ${sz} ${color} ${className}`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

