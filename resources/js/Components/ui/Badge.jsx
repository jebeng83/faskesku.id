import React from 'react';

const Badge = ({ 
    children, 
    variant = 'default', 
    className = '', 
    ...props 
}) => {
    const variants = {
        default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        destructive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        outline: 'border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100'
    };

    return (
        <span
            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;