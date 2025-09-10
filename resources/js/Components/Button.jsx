import React from "react";

export default function Button({
	children,
	type = "button",
	className = "",
	onClick,
	disabled = false,
	...props
}) {
	const baseClasses =
		"inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

	const variantClasses = {
		primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
		secondary:
			"text-gray-700 bg-white hover:bg-gray-50 border-gray-300 focus:ring-blue-500",
		danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
		success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
		warning:
			"text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
		info: "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
	};

	const sizeClasses = {
		sm: "px-3 py-1.5 text-xs",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

	const classes = `${baseClasses} ${
		variantClasses[props.variant] || variantClasses.primary
	} ${
		sizeClasses[props.size] || sizeClasses.md
	} ${disabledClasses} ${className}`;

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}
