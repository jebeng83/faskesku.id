import React, { useState, useRef, useEffect } from "react";

export default function DropdownMenu({
	trigger,
	children,
	className = "",
	position = "right",
	align = "end",
}) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

    const getPositionClasses = () => {
        const baseClasses =
            "absolute z-[1000] mt-1 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none";

		// Position (top/bottom)
		const positionClasses =
			position === "top" ? "bottom-full mb-1" : "top-full";

		// Alignment (left/right/center)
		const alignClasses = {
			start: "left-0",
			center: "left-1/2 transform -translate-x-1/2",
			end: "right-0",
		};

		return `${baseClasses} ${positionClasses} ${alignClasses[align]}`;
	};

    return (
        <div
            className={`relative inline-block text-left ${isOpen ? 'z-[2000]' : 'z-50'} ${className}`}
            ref={dropdownRef}
        >
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

			{isOpen && (
				<div className={getPositionClasses()}>
					<div className="py-1 bg-white dark:bg-gray-800 rounded-md shadow-xs">
						{children}
					</div>
				</div>
			)}
		</div>
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
