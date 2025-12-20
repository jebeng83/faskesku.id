import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function DropdownMenu({
    trigger,
    children,
    className = "",
    position = "bottom",
    align = "end",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        function handleClickOutside(event) {
            const triggerEl = triggerRef.current;
            const menuEl = menuRef.current;
            if (
                isOpen &&
                triggerEl &&
                !triggerEl.contains(event.target) &&
                menuEl &&
                !menuEl.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const updateMenuPosition = () => {
        const triggerEl = triggerRef.current;
        if (!triggerEl) return;

        const rect = triggerEl.getBoundingClientRect();

        let top = position === "top" ? rect.top : rect.bottom;
        let left;

        if (align === "start") {
            left = rect.left;
        } else if (align === "center") {
            left = rect.left + rect.width / 2;
        } else {
            left = rect.right;
        }

        setMenuPosition({ top, left });
    };

    useEffect(() => {
        if (isOpen) {
            updateMenuPosition();
        }
    }, [isOpen, position, align]);

    const getAlignClasses = () => {
        if (align === "start") {
            return "";
        }
        if (align === "center") {
            return "transform -translate-x-1/2";
        }
        return "transform -translate-x-full";
    };

    return (
        <>
            <div
                className={`inline-block text-left ${className}`}
                ref={triggerRef}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {trigger}
            </div>

            {isOpen &&
                typeof document !== "undefined" &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{
                            top: menuPosition.top,
                            left: menuPosition.left,
                        }}
                        className={`fixed z-[2000] mt-1 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${getAlignClasses()}`}
                    >
                        <div className="py-1 bg-white dark:bg-gray-800 rounded-md shadow-xs">
                            {children}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

export function DropdownItem({
	children,
	onClick,
	className = "",
	disabled = false,
	icon = null,
}) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${
				disabled
					? "opacity-50 cursor-not-allowed"
					: "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
			} group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${className}`}
		>
			{icon && (
				<span className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300">
					{icon}
				</span>
			)}
			{children}
		</button>
	);
}

export function DropdownDivider() {
	return <div className="border-t border-gray-200 dark:border-gray-600 my-1" />;
}
