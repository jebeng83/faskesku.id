import React, { useEffect } from "react";

export default function Modal({
	show = false,
	onClose,
	title,
	children,
	size = "md",
	className = "",
}) {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape" && show) {
				onClose();
			}
		};

		if (show) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [show, onClose]);

	if (!show) return null;

	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
		full: "max-w-full mx-4",
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="flex min-h-full items-center justify-center p-4">
				<div
					className={`relative w-full ${sizeClasses[size]} transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all ${className}`}
				>
					{/* Header */}
					<div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							{title}
						</h3>
						<button
							onClick={onClose}
							className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* Content */}
					<div className="px-6 py-4">{children}</div>
				</div>
			</div>
		</div>
	);
}
