import React from 'react';

const Textarea = ({ 
    className = '', 
    ...props 
}) => {
    return (
        <textarea
            className={`flex min-h-[80px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
            {...props}
        />
    );
};

export default Textarea;