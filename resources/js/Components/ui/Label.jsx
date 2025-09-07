import React from 'react';

const Label = ({ 
    children,
    className = '', 
    htmlFor,
    ...props 
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
            {...props}
        >
            {children}
        </label>
    );
};

export default Label;