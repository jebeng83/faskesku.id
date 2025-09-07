import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Alert = ({ 
    children, 
    variant = 'default', 
    className = '', 
    ...props 
}) => {
    const variants = {
        default: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300',
        destructive: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300',
        success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300'
    };

    const icons = {
        default: Info,
        destructive: AlertCircle,
        success: CheckCircle,
        warning: AlertTriangle
    };

    const Icon = icons[variant];

    return (
        <div
            className={`relative w-full rounded-lg border p-4 ${variants[variant]} ${className}`}
            {...props}
        >
            <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

const AlertTitle = ({ children, className = '', ...props }) => {
    return (
        <h5
            className={`mb-1 font-medium leading-none tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h5>
    );
};

const AlertDescription = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`text-sm opacity-90 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export { Alert, AlertTitle, AlertDescription };
export default Alert;