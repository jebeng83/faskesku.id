import React from 'react';

export default function TextInput({ className = '', ...props }) {
  const inputProps = { ...props };
  if (Object.prototype.hasOwnProperty.call(inputProps, 'value') && inputProps.value === null) {
    inputProps.value = '';
  }
  return (
    <input
      className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...inputProps}
    />
  );
}
