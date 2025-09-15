<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";

export default function SearchableSelect({
	label,
	name,
	value,
	defaultValue,
	onChange,
	options = [],
	placeholder = "Pilih opsi",
	error,
	required = false,
	disabled = false,
	className = "",
	loading = false,
	onSearch,
	searchPlaceholder = "Cari...",
	noOptionsText = "Tidak ada data",
	loadingText = "Memuat...",
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const dropdownRef = useRef(null);
	const inputRef = useRef(null);

	// Filter options based on search term
	useEffect(() => {
		if (searchTerm) {
			const filtered = options.filter((option) =>
				option.label.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredOptions(filtered);
		} else {
			setFilteredOptions(options);
		}
		setHighlightedIndex(-1);
	}, [searchTerm, options]);

	// Update filtered options when options change
	useEffect(() => {
		setFilteredOptions(options);
	}, [options]);

	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
				setSearchTerm("");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleToggle = () => {
		if (disabled) return;
		setIsOpen(!isOpen);
		if (!isOpen) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	};

	const handleSelect = (option) => {
		onChange({ target: { value: option.value } });
		setIsOpen(false);
		setSearchTerm("");
		setHighlightedIndex(-1);
	};

	const handleKeyDown = (e) => {
		if (!isOpen) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setHighlightedIndex((prev) =>
					prev < filteredOptions.length - 1 ? prev + 1 : prev
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
				break;
			case "Enter":
				e.preventDefault();
				if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
					handleSelect(filteredOptions[highlightedIndex]);
				}
				break;
			case "Escape":
				setIsOpen(false);
				setSearchTerm("");
				setHighlightedIndex(-1);
				break;
		}
	};

	const handleSearchChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);
		if (onSearch) {
			onSearch(term);
		}
	};

	const selectedOption = options.find((option) => option.value === value);

	return (
		<div
			className={`relative ${className}`}
			ref={dropdownRef}
			style={{ zIndex: isOpen ? 9999 : "auto" }}
		>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<div className="relative">
				<button
					type="button"
					onClick={handleToggle}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					className={`w-full px-3 py-2 text-left border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
						error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
					} ${
						disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
					} flex items-center justify-between`}
				>
					<span
						className={
							selectedOption ? "text-gray-900 dark:text-white" : "text-gray-500"
						}
					>
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<div className="flex items-center gap-2">
						{loading && (
							<svg
								className="animate-spin h-4 w-4 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						)}
						<svg
							className={`h-4 w-4 text-gray-400 transition-transform ${
								isOpen ? "rotate-180" : ""
							}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</button>

				{/* Hidden input for form submission */}
				<input type="hidden" name={name} value={value || ""} />

				{isOpen && (
					<div
						className="absolute z-[9999] w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-60 overflow-hidden"
						style={{ position: "absolute", top: "100%", left: 0, right: 0 }}
					>
						{/* Search Input */}
						<div className="p-2 border-b border-gray-200 dark:border-gray-600">
							<input
								ref={inputRef}
								type="text"
								value={searchTerm}
								onChange={handleSearchChange}
								placeholder={searchPlaceholder}
								className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
							/>
						</div>

						{/* Options List */}
						<div className="max-h-48 overflow-y-auto">
							{loading ? (
								<div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
									{loadingText}
								</div>
							) : filteredOptions.length === 0 ? (
								<div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
									{noOptionsText}
								</div>
							) : (
								filteredOptions.map((option, index) => (
									<button
										key={option.value}
										type="button"
										onClick={() => handleSelect(option)}
										className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
											index === highlightedIndex
												? "bg-gray-100 dark:bg-gray-600"
												: ""
										} ${
											option.value === value
												? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
												: "text-gray-900 dark:text-white"
										}`}
									>
										{option.label}
									</button>
								))
							)}
						</div>
					</div>
				)}
			</div>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
}
=======
import React, { useState, useRef, useEffect } from 'react';

const SearchableSelect = ({ 
    options = [], 
    value, 
    onChange, 
    placeholder = "Pilih opsi", 
    searchPlaceholder = "Cari...",
    className = "",
    error = false,
    displayKey = "label",
    valueKey = "value"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    // Filter options based on search term
    const filteredOptions = options.filter(option => {
        const displayValue = typeof option === 'string' ? option : option[displayKey];
        return displayValue.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Get selected option display text
    const getSelectedDisplay = () => {
        if (!value) return placeholder;
        const selectedOption = options.find(option => {
            const optionValue = typeof option === 'string' ? option : option[valueKey];
            return optionValue === value;
        });
        return selectedOption ? (typeof selectedOption === 'string' ? selectedOption : selectedOption[displayKey]) : placeholder;
    };

    // Handle option selection
    const handleSelect = (option) => {
        const optionValue = typeof option === 'string' ? option : option[valueKey];
        onChange(optionValue);
        setIsOpen(false);
        setSearchTerm('');
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Selected value display */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-3 py-2 text-left border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white flex justify-between items-center ${
                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } ${className}`}
            >
                <span className={value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                    {getSelectedDisplay()}
                </span>
                <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden">
                    {/* Search input */}
                    <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Options list */}
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => {
                                const optionValue = typeof option === 'string' ? option : option[valueKey];
                                const optionDisplay = typeof option === 'string' ? option : option[displayKey];
                                const isSelected = optionValue === value;

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                            isSelected ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                                        }`}
                                    >
                                        {optionDisplay}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                Tidak ada data ditemukan
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
>>>>>>> kohsun
