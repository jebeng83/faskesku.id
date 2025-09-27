import React from 'react';

const Label = ({ 
  children, 
  htmlFor,
  className = '', 
  required = false,
  ...props 
}) => {
  const baseClasses = 'block text-sm font-medium text-gray-700';
  const classes = `${baseClasses} ${className}`;
  
  return (
    <label 
      htmlFor={htmlFor}
      className={classes} 
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;