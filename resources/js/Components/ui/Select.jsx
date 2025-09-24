import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Find the selected item's text to display
  const getSelectedText = () => {
    if (!value) return null;
    
    let selectedText = null;
    React.Children.forEach(children, child => {
      if (child.type === SelectContent) {
        React.Children.forEach(child.props.children, item => {
          if (item.type === SelectItem && String(item.props.value) === String(value)) {
            selectedText = item.props.children;
          }
        });
      }
    });
    return selectedText;
  };

  return (
    <div ref={selectRef} className="relative" {...props}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          isOpen, 
          setIsOpen, 
          value, 
          onValueChange,
          selectedText: getSelectedText()
        })
      )}
    </div>
  );
};

export default Select;

export const SelectTrigger = ({ 
  children, 
  className = '', 
  isOpen, 
  setIsOpen,
  onValueChange,
  selectedText,
  value,
  ...props 
}) => {
  return (
    <button
      type="button"
      className={`w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { selectedText, value }) : child
      )}
      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

export const SelectValue = ({ 
  placeholder = 'Select an option', 
  value,
  selectedText,
  className = '',
  children,
  ...props 
}) => {
  const displayText = children || selectedText || placeholder;
  const hasValue = selectedText || children;
  
  return (
    <span className={`${!hasValue ? 'text-gray-400' : 'text-gray-900'} ${className}`} {...props}>
      {displayText}
    </span>
  );
};

export const SelectContent = ({ 
  children, 
  className = '', 
  isOpen,
  onValueChange,
  selectedText,
  value,
  setIsOpen,
  ...props 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className={`absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}
      style={{ zIndex: 9999 }}
      {...props}
    >
      {React.Children.map(children, child => 
        // IMPORTANT: do NOT pass `value` down, it will override each SelectItem's own value
        React.cloneElement(child, { 
          onValueChange,
          setIsOpen,
          selectedText
        })
      )}
    </div>
  );
};

export const SelectItem = ({ 
  children, 
  value, 
  className = '', 
  onValueChange,
  isOpen,
  setIsOpen,
  selectedText,
  ...props 
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nextValue = String(value ?? '');
    if (onValueChange && typeof onValueChange === 'function') {
      onValueChange(nextValue);
    }
    if (setIsOpen && typeof setIsOpen === 'function') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 select-none ${className}`}
      onClick={handleClick}
      role="option"
      tabIndex={0}
      {...props}
      data-value={value}
    >
      {children}
    </div>
  );
};