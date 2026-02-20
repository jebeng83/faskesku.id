import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

export default function DropdownMenu({
	trigger,
	children,
	className = "",
	position = "right",
	align = "end",
	usePortal = false,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef(null);
	const menuRef = useRef(null);
	const [menuStyles, setMenuStyles] = useState({
		top: 0,
		left: 0,
		visibility: "hidden",
	});

	useEffect(() => {
		function handleClickOutside(event) {
			const target = event.target;
			if (
				(triggerRef.current && triggerRef.current.contains(target)) ||
				(menuRef.current && menuRef.current.contains(target))
			) {
				return;
			}
			setIsOpen(false);
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

	useLayoutEffect(() => {
		if (!isOpen || !usePortal) return;

		const updatePosition = () => {
			if (!triggerRef.current || !menuRef.current) return;
			const triggerRect = triggerRef.current.getBoundingClientRect();
			const menuRect = menuRef.current.getBoundingClientRect();
			const offset = 4;
			let top =
				position === "top"
					? triggerRect.top - menuRect.height - offset
					: triggerRect.bottom + offset;
			let left = triggerRect.left;
			if (align === "end") {
				left = triggerRect.right - menuRect.width;
			} else if (align === "center") {
				left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
			}

			const padding = 8;
			const maxTop = window.innerHeight - menuRect.height - padding;
			const maxLeft = window.innerWidth - menuRect.width - padding;
			top = Math.min(Math.max(top, padding), maxTop);
			left = Math.min(Math.max(left, padding), maxLeft);

			setMenuStyles({ top, left, visibility: "visible" });
		};

		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);
		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [isOpen, position, align, usePortal]);

	const portalMenu = isOpen ? (
		<div
			ref={menuRef}
			className="fixed z-[3000] w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			style={menuStyles}
		>
			<div className="py-1 bg-white dark:bg-gray-800 rounded-md shadow-xs">
				{children}
			</div>
		</div>
	) : null;

	return (
		<div
			className={`relative inline-block text-left ${isOpen ? "z-[2000]" : "z-50"} ${className}`}
		>
			<div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
				{trigger}
			</div>

			{usePortal
				? createPortal(portalMenu, document.body)
				: isOpen && (
						<div className={getPositionClasses()} ref={menuRef}>
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
