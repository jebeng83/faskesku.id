import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
    const portalElRef = useRef(null);
    const [portalPos, setPortalPos] = useState({ top: 0, left: 0, width: 0 });

    // Filter options based on search term
    const filteredOptions = options.filter(option => {
        const displayValueRaw = typeof option === 'string' ? option : option[displayKey];
        const displayValue = (displayValueRaw ?? '').toString();
        return displayValue.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Get selected option display text
    const getSelectedDisplay = () => {
        if (!value) return placeholder;
        const selectedOption = options.find(option => {
            const optionValue = typeof option === 'string' ? option : option[valueKey];
            return optionValue === value;
        });
        if (!selectedOption) return placeholder;
        const labelRaw = typeof selectedOption === 'string' ? selectedOption : selectedOption[displayKey];
        return (labelRaw ?? '').toString() || placeholder;
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
            const clickedInsideTrigger = dropdownRef.current && dropdownRef.current.contains(event.target);
            const clickedInsidePortal = portalElRef.current && portalElRef.current.contains(event.target);
            // Jika klik terjadi di dalam trigger atau konten portal dropdown, JANGAN tutup.
            if (clickedInsideTrigger || clickedInsidePortal) return;
            // Selain itu, tutup dropdown.
            setIsOpen(false);
            setSearchTerm('');
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Compute dropdown position (for portal) and focus when open
    useEffect(() => {
        const updatePosition = () => {
            const el = dropdownRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            // Position dropdown just below the trigger button
            setPortalPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
        };

        if (isOpen) {
            updatePosition();
            if (!portalElRef.current) {
                portalElRef.current = document.createElement('div');
                portalElRef.current.setAttribute('data-searchable-select-portal', '');
                document.body.appendChild(portalElRef.current);
            }
            // listeners to keep dropdown aligned while scrolling/resizing
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            // focus search input slightly after mount
            setTimeout(() => {
                if (searchInputRef.current) searchInputRef.current.focus();
            }, 0);
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
            if (!isOpen && portalElRef.current) {
                try {
                    document.body.removeChild(portalElRef.current);
                } catch (e) {}
                portalElRef.current = null;
            }
        };
    }, [isOpen]);

    return (
        <div className={`relative ${isOpen ? 'z-[2000]' : 'z-50'}`} ref={dropdownRef}>
            {/* Selected value display */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-11 px-3 text-left border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex justify-between items-center ${
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

            {/* Dropdown rendered via portal to escape stacking contexts */}
            {isOpen && portalElRef.current && createPortal(
                <div
                    style={{
                        position: 'fixed',
                        top: portalPos.top,
                        left: portalPos.left,
                        width: portalPos.width,
                        // Pastikan dropdown berada di atas modal overlay (z-[9999])
                        zIndex: 10000
                    }}
                    className="mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg max-h-60 overflow-hidden"
                >
                    {/* Search input */}
                    <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
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
                                        className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 ${
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
                </div>,
                portalElRef.current
            )}
        </div>
    );
};

export default SearchableSelect;
