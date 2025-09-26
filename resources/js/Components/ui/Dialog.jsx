import React, { useEffect } from 'react';

export const Dialog = ({ children, open, onOpenChange }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
};

export const DialogTrigger = ({ children, asChild, ...props }) => {
  return React.cloneElement(children, props);
};

export const DialogContent = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`relative w-full max-w-6xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DialogHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`px-6 py-4 border-b border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const DialogDescription = ({ children, className = '', ...props }) => {
  return (
    <p
      className={`text-sm text-gray-600 mt-2 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export const DialogFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-200 flex justify-end gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Dialog;