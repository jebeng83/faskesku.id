import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ children, value, onValueChange, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || '');
    const [selectedLabel, setSelectedLabel] = useState('');

    const handleSelect = (newValue, label) => {
        setSelectedValue(newValue);
        setSelectedLabel(label);
        setIsOpen(false);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <div className="relative" {...props}>
            {React.Children.map(children, child => {
                if (child.type === SelectTrigger) {
                    return React.cloneElement(child, {
                        onClick: () => setIsOpen(!isOpen),
                        selectedLabel,
                        isOpen
                    });
                }
                if (child.type === SelectContent) {
                    return React.cloneElement(child, {
                        isOpen,
                        onSelect: handleSelect,
                        selectedValue
                    });
                }
                return child;
            })}
        </div>
    );
};

const SelectTrigger = ({ children, className = '', onClick, selectedLabel, isOpen, ...props }) => {
    return (
        <button
            type="button"
            className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            onClick={onClick}
            {...props}
        >
            <span>{selectedLabel || children}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
    );
};

const SelectValue = ({ placeholder = 'Select...', children }) => {
    return <span>{children || placeholder}</span>;
};

const SelectContent = ({ children, className = '', isOpen, onSelect, selectedValue, ...props }) => {
    if (!isOpen) return null;

    return (
        <div
            className={`absolute top-full left-0 z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}
            {...props}
        >
            {React.Children.map(children, child => {
                if (child.type === SelectItem) {
                    return React.cloneElement(child, {
                        onSelect,
                        isSelected: child.props.value === selectedValue
                    });
                }
                return child;
            })}
        </div>
    );
};

const SelectItem = ({ children, value, className = '', onSelect, isSelected, ...props }) => {
    return (
        <div
            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''} ${className}`}
            onClick={() => onSelect(value, children)}
            {...props}
        >
            {children}
        </div>
    );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
export default Select;