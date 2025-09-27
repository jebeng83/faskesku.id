import React from 'react';

const Table = ({ children, className = '', ...props }) => {
  const classes = `min-w-full divide-y divide-gray-200 ${className}`;
  
  return (
    <div className="overflow-x-auto">
      <table className={classes} {...props}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children, className = '', ...props }) => {
  const classes = `bg-gray-50 ${className}`;
  
  return (
    <thead className={classes} {...props}>
      {children}
    </thead>
  );
};

const TableBody = ({ children, className = '', ...props }) => {
  const classes = `bg-white divide-y divide-gray-200 ${className}`;
  
  return (
    <tbody className={classes} {...props}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = '', ...props }) => {
  const classes = `hover:bg-gray-50 ${className}`;
  
  return (
    <tr className={classes} {...props}>
      {children}
    </tr>
  );
};

const TableHead = ({ children, className = '', ...props }) => {
  const classes = `px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`;
  
  return (
    <th className={classes} {...props}>
      {children}
    </th>
  );
};

const TableCell = ({ children, className = '', ...props }) => {
  const classes = `px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`;
  
  return (
    <td className={classes} {...props}>
      {children}
    </td>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };