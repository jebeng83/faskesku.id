import React from "react";

export default function Switch({
    checked = false,
    onChange = () => {},
    disabled = false,
    className = "",
    size = "md",
    onLabel = "Ya",
    offLabel = "Tidak",
}) {
    const sizes = {
        sm: {
            wrapper: "w-24 h-8",
            knob: "w-7 h-7",
            translateOn: "translate-x-16",
            translateOff: "translate-x-2",
            text: "text-xs",
        },
        md: {
            wrapper: "w-32 h-10",
            knob: "w-8 h-8",
            translateOn: "translate-x-24",
            translateOff: "translate-x-2",
            text: "text-sm",
        },
        lg: {
            wrapper: "w-36 h-10",
            knob: "w-8 h-8",
            translateOn: "translate-x-28",
            translateOff: "translate-x-2",
            text: "text-sm",
        },
    };

    const sz = sizes[size] || sizes.md;

    const bgClass = checked ? "bg-teal-500" : "bg-gray-300";
    const labelColor = checked ? "text-white" : "text-gray-700";

    const handleClick = () => {
        if (disabled) return;
        onChange(!checked);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={handleClick}
            className={`relative inline-flex items-center rounded-full ${bgClass} ${
                sz.wrapper
            } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${className}`}
        >
            <span
                className={`absolute left-3 ${labelColor} ${
                    sz.text
                } font-semibold pointer-events-none select-none ${
                    checked ? "opacity-100" : "opacity-0"
                }`}
            >
                {onLabel}
            </span>
            <span
                className={`absolute right-3 ${labelColor} ${
                    sz.text
                } font-semibold pointer-events-none select-none ${
                    checked ? "opacity-0" : "opacity-100"
                }`}
            >
                {offLabel}
            </span>
            <span
                className={`absolute rounded-full bg-white shadow transition-transform duration-200 ${
                    sz.knob
                } ${checked ? sz.translateOn : sz.translateOff}`}
            />
        </button>
    );
}
