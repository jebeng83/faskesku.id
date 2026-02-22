import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

export default function DropdownMenu({
	trigger,
	children,
	className = "",
	position = "bottom",
	align = "end",
	usePortal = true,
	stopPropagation = false,
	closeOnSelect = false,
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
			"absolute z-[10000] mt-1 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none";

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
			const padding = 8;
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

			const maxTop = window.innerHeight - menuRect.height - padding;
			const maxLeft = window.innerWidth - menuRect.width - padding;
			const fitsBelow = triggerRect.bottom + offset + menuRect.height <= window.innerHeight - padding;
			const fitsAbove = triggerRect.top - offset - menuRect.height >= padding;
			if (position === "bottom" && !fitsBelow && fitsAbove) {
				top = triggerRect.top - menuRect.height - offset;
			} else if (position === "top" && !fitsAbove && fitsBelow) {
				top = triggerRect.bottom + offset;
			}
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
			className="w-56 rounded-lg border border-gray-200/80 dark:border-gray-700/70 bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden"
			style={{
				position: "fixed",
				zIndex: 2147483647,
				...menuStyles,
			}}
		>
			<div className="py-1">
				{children}
			</div>
		</div>
	) : null;

	return (
		<div
			className={`relative inline-block text-left overflow-visible ${className}`}
		>
			<div
				ref={triggerRef}
				onClick={(event) => {
					if (stopPropagation) event.stopPropagation();
					setIsOpen(!isOpen);
				}}
			>
				{trigger}
			</div>

			{usePortal
				? typeof document !== "undefined" &&
					createPortal(
						<div
							onClick={(event) => {
								if (stopPropagation) event.stopPropagation();
								if (closeOnSelect) setIsOpen(false);
							}}
						>
							{portalMenu}
						</div>,
						document.body
					)
				: isOpen && (
						<div
							className={getPositionClasses()}
							ref={menuRef}
							onClick={(event) => {
								if (stopPropagation) event.stopPropagation();
								if (closeOnSelect) setIsOpen(false);
							}}
						>
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
			} group flex items-center w-full gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 ${className}`}
		>
			{icon && (
				<span className="text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 flex-shrink-0">
					{icon}
				</span>
			)}
			<span className="flex-1 text-left whitespace-normal leading-snug">
				{children}
			</span>
		</button>
	);
}

export function DropdownDivider() {
	return <div className="border-t border-gray-200 dark:border-gray-600 my-1" />;
}
