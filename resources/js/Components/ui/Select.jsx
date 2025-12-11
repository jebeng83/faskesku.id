import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// NOTE: Avoid passing non-DOM props (like onValueChange, selectedValue, isOpen) to DOM elements
// to prevent React warnings. We explicitly handle className and internal state only.
const Select = ({ children, value, onValueChange, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || "");
    const selectRef = useRef(null);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideTrigger = triggerRef.current && triggerRef.current.contains(event.target);
            const clickedInsideContent = contentRef.current && contentRef.current.contains(event.target);
            
            if (!clickedInsideTrigger && !clickedInsideContent) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedValue(value || "");
    }, [value]);

    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 4,
                left: rect.left,
                width: rect.width,
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            updatePosition();
            
            const handleScroll = () => updatePosition();
            const handleResize = () => updatePosition();
            
            window.addEventListener("scroll", handleScroll, true);
            window.addEventListener("resize", handleResize);
            
            return () => {
                window.removeEventListener("scroll", handleScroll, true);
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [isOpen]);

    const handleValueChange = (newValue) => {
        setSelectedValue(newValue);
        setIsOpen(false);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <div
            ref={selectRef}
            className={`relative ${isOpen ? "z-[9999]" : ""} ${className}`}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        isOpen,
                        setIsOpen,
                        selectedValue,
                        onValueChange: handleValueChange,
                        triggerRef,
                        position,
                        contentRef,
                    });
                }
                return child;
            })}
        </div>
    );
};

const SelectTrigger = ({ children, className = "", isOpen, setIsOpen, triggerRef }) => {
    return (
        <button
            ref={triggerRef}
            type="button"
            className={`flex items-center justify-between w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            onClick={() => setIsOpen && setIsOpen(!isOpen)}
        >
            {children}
            <svg
                className={`w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>
    );
};

const SelectValue = ({ placeholder = "Select...", selectedValue }) => {
    return (
        <span className="block truncate">{selectedValue || placeholder}</span>
    );
};

const SelectContent = ({
    children,
    className = "",
    isOpen,
    selectedValue,
    onValueChange,
    position,
    contentRef,
}) => {
    if (!isOpen) return null;

    const content = (
        <div
            ref={contentRef}
            className={`fixed z-[9999] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}
            style={{
                zIndex: 9999,
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${position.width}px`,
            }}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child, {
                          selectedValue,
                          onValueChange,
                      })
                    : child
            )}
        </div>
    );

    // Use portal to render outside the Card structure
    return typeof document !== "undefined"
        ? createPortal(content, document.body)
        : content;
};

const SelectItem = ({
    children,
    value,
    className = "",
    onValueChange,
    selectedValue,
}) => {
    const isSelected = selectedValue === value;

    return (
        <div
            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                isSelected ? "bg-blue-50 text-blue-600" : "text-gray-900"
            } ${className}`}
            onClick={() => onValueChange && onValueChange(value)}
        >
            {children}
        </div>
    );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
