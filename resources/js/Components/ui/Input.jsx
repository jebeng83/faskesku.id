import React from 'react';

const Input = ({ 
  type = 'text',
  className = '',
  error = false,
  disabled = false,
  placeholder = '',
  ...props 
}) => {
  const baseClasses = 'block w-full px-2 py-1.5 text-sm border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors';
  
  const stateClasses = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    
  const disabledClasses = disabled 
    ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
    : 'bg-white text-gray-900';
  
  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;
  const inputProps = { ...props };
  if (Object.prototype.hasOwnProperty.call(inputProps, 'value') && inputProps.value === null) {
    inputProps.value = '';
  }
  
  return (
    <input
      type={type}
      className={classes}
      disabled={disabled}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export default Input;
