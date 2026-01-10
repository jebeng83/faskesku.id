import React from "react";

export default function SelectWithAdd({
	label,
	name,
	value,
	_defaultValue,
	onChange,
	options = [],
	placeholder = "Pilih opsi",
	error,
	required = false,
	onAdd,
	addButtonText = "Tambah",
	disabled = false,
	className = "",
}) {

	const handleAddClick = () => {
		if (onAdd) {
			onAdd();
		}
	};

	return (
		<div className={className}>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<div className="flex gap-2">
				<select
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
					className={`flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
						error ? "border-red-500" : ""
					} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
				>
					<option value="">{placeholder}</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{onAdd && (
					<button
						type="button"
						onClick={handleAddClick}
						disabled={disabled}
						className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-1 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 disabled:transform-none"
						title={addButtonText}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4"
						>
							<path
								fillRule="evenodd"
								d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="hidden sm:inline">{addButtonText}</span>
					</button>
				)}
			</div>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
}
