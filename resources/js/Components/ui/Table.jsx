import React from 'react';

const Table = ({ children, className = '', ...props }) => {
    return (
        <div className="w-full overflow-auto">
            <table
                className={`w-full caption-bottom text-sm ${className}`}
                {...props}
            >
                {children}
            </table>
        </div>
    );
};

const TableHeader = ({ children, className = '', ...props }) => {
    return (
        <thead
            className={`bg-white dark:bg-red-900 ${className}`}
            {...props}
        >
            {children}
        </thead>
    );
};

const TableBody = ({ children, className = '', ...props }) => {
    return (
        <tbody
            className={`bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ${className}`}
            {...props}
        >
            {children}
        </tbody>
    );
};

const TableRow = ({ children, className = '', ...props }) => {
    return (
        <tr
            className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${className}`}
            {...props}
        >
            {children}
        </tr>
    );
};

const TableHead = ({ children, className = '', ...props }) => {
    return (
        <th
            className={`px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider ${className}`}
            {...props}
        >
            {children}
        </th>
    );
};

const TableCell = ({ children, className = '', ...props }) => {
    return (
        <td
            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 ${className}`}
            {...props}
        >
            {children}
        </td>
    );
};

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
export default Table;