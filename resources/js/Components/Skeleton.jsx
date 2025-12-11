import React from "react";

export default function Skeleton({ variant = "text", width, height, className = "", lines = 3, circleSize = 40 }) {
  if (variant === "circle") {
    const size = typeof circleSize === "number" ? `${circleSize}px` : circleSize;
    return (
      <div
        className={`rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  if (variant === "rect") {
    return (
      <div
        className={`rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }
  const count = Math.max(1, parseInt(lines, 10) || 1);
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${i !== count - 1 ? "mb-2" : ""} animate-pulse`}
          style={{ width: width || `${90 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

