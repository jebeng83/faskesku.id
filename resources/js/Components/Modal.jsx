import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Variants untuk transisi sangat halus dan lembut
const backdropVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.16, 1, 0.3, 1], // Easing lebih halus dan natural
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.4,
			ease: [0.16, 1, 0.3, 1],
		},
	},
};

const modalVariants = {
	hidden: {
		opacity: 0,
		scale: 0.96, // Scale lebih subtle (dari 0.95 ke 0.96)
		y: 10, // Translate Y lebih kecil (dari 20 ke 10)
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			duration: 0.6, // Durasi lebih panjang untuk transisi lebih halus
			ease: [0.16, 1, 0.3, 1], // Easing lebih halus dan natural
			delay: 0.05, // Delay kecil untuk efek staggered dengan backdrop
		},
	},
	exit: {
		opacity: 0,
		scale: 0.96,
		y: 10,
		transition: {
			duration: 0.4, // Durasi exit lebih panjang untuk transisi keluar yang lebih halus
			ease: [0.16, 1, 0.3, 1],
		},
	},
};

export default function Modal({
    show = false,
    onClose,
    title,
    children,
    size = "md",
    className = "",
    zIndex = 50,
    headerClassName = "",
    titleClassName = "",
    showTopGradient = false,
    backdropClassName = "",
}) {
	const reduceMotion = useMemo(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
		[]
	);

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

	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
		xxl: "max-w-6xl",
		wide: "max-w-7xl",
		full: "max-w-full mx-4",
	};

	// Variants yang disesuaikan untuk reduce motion
	const finalBackdropVariants = reduceMotion
		? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
		: backdropVariants;

	const finalModalVariants = reduceMotion
		? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
		: modalVariants;

    return (
		<AnimatePresence>
			{show && (
				<div className="fixed inset-0 overflow-y-auto" style={{ zIndex }}>
					{/* Backdrop */}
					<motion.div
						variants={finalBackdropVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className={`fixed inset-0 bg-black/50 ${backdropClassName}`}
						onClick={onClose}
					/>

					{/* Modal */}
					<div className="flex min-h-full items-center justify-center p-4">
						<motion.div
							variants={finalModalVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className={`relative w-full ${sizeClasses[size]} overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl ${className}`}
						>
							{showTopGradient && (
								<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
							)}
							{/* Header */}
							<div className={`flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4 ${headerClassName}`}>
								<h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${titleClassName}`}>
									{title}
								</h3>
								<button
									onClick={onClose}
									className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
}
