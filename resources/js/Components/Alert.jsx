import React, { useEffect } from "react";

export default function Alert({
	isOpen = false,
	type = "success",
	title,
	message,
	confirmText = "OK",
	cancelText = "Batal",
	showCancel = false,
	onConfirm,
	onCancel,
	onClose,
	autoClose = false,
	autoCloseDelay = 3000,
}) {
	useEffect(() => {
		if (isOpen && autoClose) {
			const timer = setTimeout(() => {
				onClose?.();
			}, autoCloseDelay);
			return () => clearTimeout(timer);
		}
	}, [isOpen, autoClose, autoCloseDelay, onClose]);

	if (!isOpen) return null;

	const isSuccess = type === "success";
	const isError = type === "error";
	const isWarning = type === "warning";
	const isInfo = type === "info";

	const getIcon = () => {
		if (isSuccess) {
			return (
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
					<svg
						className="h-6 w-6 text-green-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
			);
		}
		if (isError) {
			return (
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
					<svg
						className="h-6 w-6 text-red-600"
						xmlns="http://www.w3.org/2000/svg"
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
				</div>
			);
		}
		if (isWarning) {
			return (
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
					<svg
						className="h-6 w-6 text-yellow-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>
			);
		}
		return (
			<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
				<svg
					className="h-6 w-6 text-blue-600"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
		);
	};

	const getButtonClass = (isPrimary = true) => {
		const baseClass =
			"inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm";

		if (isPrimary) {
			if (isSuccess)
				return `${baseClass} bg-green-600 hover:bg-green-700 focus:ring-green-500`;
			if (isError)
				return `${baseClass} bg-red-600 hover:bg-red-700 focus:ring-red-500`;
			if (isWarning)
				return `${baseClass} bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500`;
			return `${baseClass} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`;
		}
		return `${baseClass} bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 border-gray-300`;
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				{/* Overlay */}
				<div
					className="fixed inset-0 bg-gray-500/75 transition-opacity"
					onClick={onClose}
				></div>

				{/* Modal */}
				<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
								{getIcon()}
								<div className="mt-3">
									<h3 className="text-lg font-medium leading-6 text-gray-900">
										{title}
									</h3>
									<div className="mt-2">
										<p className="text-sm text-gray-500">{message}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<button
							type="button"
							className={getButtonClass(true)}
							onClick={onConfirm || onClose}
						>
							{confirmText}
						</button>
						{showCancel && (
							<button
								type="button"
								className={getButtonClass(false)}
								onClick={onCancel || onClose}
							>
								{cancelText}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
