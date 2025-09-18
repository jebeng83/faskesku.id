import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`p-6 pb-0 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

const CardTitle = ({ children, className = '', ...props }) => {
    return (
        <h3
            className={`text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100 ${className}`}
            {...props}
        >
            {children}
        </h3>
    );
};

const CardContent = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export { Card, CardHeader, CardTitle, CardContent };
export default Card;