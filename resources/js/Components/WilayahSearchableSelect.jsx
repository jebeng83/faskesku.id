import React, { useState, useEffect, useRef } from "react";
// import axios from "axios"; // Removed to use window.axios

export default function WilayahSearchableSelect({
	label,
	name,
	value,
	onChange,
	level, // 'province', 'regency', 'district', 'village'
	parentCode, // Required for regency, district, village
	placeholder = "Pilih wilayah",
	error,
	required = false,
	disabled = false,
	className = "",
	searchPlaceholder = "Cari wilayah...",
	noOptionsText = "Tidak ada data",
	loadingText = "Memuat...",
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [options, setOptions] = useState([]);
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const [loading, setLoading] = useState(false);
	const [searchLoading, setSearchLoading] = useState(false);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const inputRef = useRef(null);
	const searchTimeoutRef = useRef(null);

	// Load initial data
	useEffect(() => {
		loadInitialData();
	}, [level, parentCode]);

	// Load data when value changes (for editing existing data)
	useEffect(() => {
		if (value && options.length === 0) {
			loadInitialData();
		}
	}, [value]);

	// Filter options based on search term
	useEffect(() => {
		if (searchTerm) {
			const filtered = options.filter((option) =>
				option.label.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredOptions(filtered);
		} else {
			// Only reset to options if we have options loaded
			// This prevents clearing search results when searchTerm is empty
			if (options.length > 0) {
				setFilteredOptions(options);
			}
		}
		setHighlightedIndex(-1);
	}, [searchTerm, options]);


	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
				buttonRef.current && !buttonRef.current.contains(event.target)) {
				setIsOpen(false);
				// Don't reset searchTerm here to preserve search results
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const loadInitialData = async () => {
		if (disabled) return;

		setLoading(true);
		try {
			let url = "";
			switch (level) {
				case "province":
					url = "/api/wilayah/provinces";
					break;
				case "regency":
					if (!parentCode) return;
					url = `/api/wilayah/regencies/${parentCode}`;
					break;
				case "district":
					if (!parentCode) return;
					url = `/api/wilayah/districts/${parentCode}`;
					break;
				case "village":
					// For village level, use the new all-villages endpoint with limit
					url = "/api/wilayah/all-villages?limit=50";
					break;
				default:
					return;
			}

			const response = await window.axios.get(url);

			if (response.data && response.data.success) {
                const data = response.data.data.map((item) => ({
                    value: item.code,
                    label: item.name,
                    fullAddress: item.full_address,
                }));
                setOptions(data);
                setFilteredOptions(data);
            }
		} catch (error) {
			console.error(`Error loading ${level}:`, error);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = async (term) => {
		if (!term || term.length < 2) {
			setFilteredOptions(options);
			return;
		}

		// Clear previous timeout
		if (searchTimeoutRef.current) {
			clearTimeout(searchTimeoutRef.current);
		}

		// Set new timeout for search
		searchTimeoutRef.current = setTimeout(async () => {
			setSearchLoading(true);
			try {
				let url = "";
				if (level === "village") {
					// Use the new all-villages endpoint with filter and limit
					url = `/api/wilayah/all-villages?filter=${encodeURIComponent(
						term
					)}&limit=50`;
				} else {
					// Use the existing search endpoint for other levels
					url = `/api/wilayah/search?q=${encodeURIComponent(
						term
					)}&level=${level}`;
				}

				const response = await window.axios.get(url, {
                    headers: { Accept: "application/json" },
                });
				if (response.data && response.data.success) {
					const data = response.data.data.map((item) => ({
						value: item.code,
						label: item.name,
						fullAddress: item.full_address,
					}));
					setFilteredOptions(data);
				}
			} catch (error) {
				console.error("Error searching wilayah:", error);
			} finally {
				setSearchLoading(false);
			}
		}, 300); // 300ms delay
	};



	const handleToggle = () => {
		if (disabled || loading) return;
		setIsOpen(!isOpen);
		
		if (!isOpen) {
			// Focus input after a short delay to ensure dropdown is rendered
			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.focus();
				}
			}, 100);
			
			// When opening dropdown, ensure we have the selected option available
			if (value && !options.find((opt) => opt.value === value)) {
				// If we have a value but it's not in options, we need to load it
				// This can happen when editing existing data
				loadInitialData();
			}
		}
	};

	const handleSelect = (option) => {
		// Create enhanced event object with full address data
		const enhancedEvent = {
			target: {
				value: option.value,
			},
			selectedOption: option,
			fullAddress: option.fullAddress,
		};

		onChange(enhancedEvent);
		setIsOpen(false);
		setSearchTerm("");
		setHighlightedIndex(-1);

		// Add selected option to options if it's not already there
		// This ensures the selected option is available for display
		if (!options.find((opt) => opt.value === option.value)) {
			setOptions((prev) => [...prev, option]);
		}

		// Reset filteredOptions to show all options after selection
		// This ensures the selected option is visible when dropdown is reopened
		setFilteredOptions((prev) => {
			const allOptions = [...options];
			if (!allOptions.find((opt) => opt.value === option.value)) {
				allOptions.push(option);
			}
			return allOptions;
		});
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
		handleSearch(term);
	};

	const selectedOption =
		options.find((option) => option.value === value) ||
		filteredOptions.find((option) => option.value === value);

	const getLevelLabel = () => {
		switch (level) {
			case "province":
				return "Provinsi";
			case "regency":
				return "Kabupaten/Kota";
			case "district":
				return "Kecamatan";
			case "village":
				return "Kelurahan/Desa";
			default:
				return "Wilayah";
		}
	};

	return (
		<div
			className={`relative ${className}`}
			style={{ zIndex: isOpen ? 10000 : "auto", position: "relative" }}
		>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
				{label || getLevelLabel()}{" "}
				{required && <span className="text-red-500">*</span>}
			</label>
			<div className="relative" style={{ zIndex: isOpen ? 10000 : "auto", position: "relative" }}>
				<button
					ref={buttonRef}
					type="button"
					onClick={handleToggle}
					onKeyDown={handleKeyDown}
					disabled={disabled || loading}
					className={`w-full px-3 py-2 text-left border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
						error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
					} ${
						disabled || loading
							? "opacity-50 cursor-not-allowed"
							: "cursor-pointer"
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
						{(loading || searchLoading) && (
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
						ref={dropdownRef}
						className="absolute z-[10000] w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-60 overflow-hidden"
						style={{
							position: "absolute",
							top: "100%",
							left: 0,
							right: 0,
							zIndex: 10000,
						}}
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
									{searchLoading ? "Mencari..." : noOptionsText}
									{level === "village" && !searchLoading && (
										<div className="mt-1 text-xs">
											Ketik minimal 2 karakter untuk mencari kelurahan/desa
										</div>
									)}
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
										<div className="flex flex-col">
											<span className="font-medium">{option.label}</span>
											{option.fullAddress && (
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{option.fullAddress}
												</span>
											)}
										</div>
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
