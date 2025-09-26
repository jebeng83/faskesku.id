import React from 'react';

export const Label = ({ 
  children, 
  className = '', 
  htmlFor,
  ...props 
}) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;