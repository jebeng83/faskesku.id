import React from "react";

export const Button = ({
	children,
	type = "button",
	className = "",
	onClick,
	disabled = false,
	variant = "primary",
	size = "md",
	...props
}) => {
	const baseClasses =
		"inline-flex items-center justify-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

	const variantClasses = {
		primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
		secondary:
			"text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-blue-500",
		danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
		success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
		warning:
			"text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
		info: "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
		outline: "text-gray-700 bg-transparent hover:bg-gray-50 border border-gray-300 focus:ring-blue-500",
	};

	const sizeClasses = {
		sm: "px-3 py-1.5 text-xs",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

	const classes = `${baseClasses} ${
		variantClasses[variant] || variantClasses.primary
	} ${
		sizeClasses[size] || sizeClasses.md
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
};

export default Button;