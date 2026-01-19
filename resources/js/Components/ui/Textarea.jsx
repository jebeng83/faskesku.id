import React, { forwardRef, memo, useRef } from 'react';

const BaseTextarea = ({
  className = '',
  error = false,
  disabled = false,
  placeholder = '',
  rows = 3,
  value,
  onChange,
  protectFocus = true,
  ...props
}, ref) => {
  const baseClasses = 'block w-full text-sm rounded-md border transition-colors resize-none bg-white dark:bg-gray-800 dark:text-white';

  const stateClasses = error
    ? 'border-red-300 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500'
    : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500';

  const disabledClasses = disabled
    ? 'bg-gray-50 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
    : '';

  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;

  const lastChangeTs = useRef(0);
  const composingRef = useRef(false);
  const caretRef = useRef({ start: null, end: null });

  const handleChange = (e) => {
    lastChangeTs.current = Date.now();
    try {
      caretRef.current = {
        start: e.target.selectionStart,
        end: e.target.selectionEnd,
      };
    } catch (_) {}
    if (typeof onChange === 'function') onChange(e);
  };

  const handleBlur = (e) => {
    if (!protectFocus) return;
    const recentlyChanged = Date.now() - lastChangeTs.current <= 400;
    if (recentlyChanged && !composingRef.current && !disabled) {
      const el = e.target;
      setTimeout(() => {
        try {
          el.focus();
          const { start, end } = caretRef.current || {};
          const len = el.value ? String(el.value).length : 0;
          el.setSelectionRange(
            Number.isFinite(start) ? start : len,
            Number.isFinite(end) ? end : len
          );
        } catch (_) {}
      }, 0);
    }
  };

  const handleKeyDownCapture = (e) => {
    if (!protectFocus) return;
    e.stopPropagation();
  };

  const handleCompositionStart = () => {
    composingRef.current = true;
  };

  const handleCompositionEnd = () => {
    composingRef.current = false;
  };

  return (
    <textarea
      ref={ref}
      className={classes}
      disabled={disabled}
      placeholder={placeholder}
      rows={rows}
      value={value ?? ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDownCapture={handleKeyDownCapture}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      autoComplete="off"
      {...props}
    />
  );
};

const Textarea = memo(forwardRef(BaseTextarea));

export default Textarea;
