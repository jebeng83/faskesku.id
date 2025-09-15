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
