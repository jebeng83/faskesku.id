import React, { useState, useRef, useEffect } from 'react';

const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div ref={selectRef} className={`relative ${isOpen ? 'z-[2000]' : ''}`} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            setIsOpen,
            selectedValue,
            onValueChange: handleValueChange,
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ children, className = '', isOpen, setIsOpen, ...props }) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-between w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      onClick={() => setIsOpen && setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <svg
        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

const SelectValue = ({ placeholder = 'Select...', selectedValue, ...props }) => {
  return (
    <span className="block truncate" {...props}>
      {selectedValue || placeholder}
    </span>
  );
};

const SelectContent = ({ children, className = '', isOpen, ...props }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-[1000] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const SelectItem = ({ children, value, className = '', onValueChange, selectedValue, ...props }) => {
  const isSelected = selectedValue === value;

  return (
    <div
      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-900'} ${className}`}
      onClick={() => onValueChange && onValueChange(value)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };