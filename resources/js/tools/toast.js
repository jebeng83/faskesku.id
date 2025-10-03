// Toast notification utility
// This creates a simple toast notification system that can be used across the application

let toastContainer = null;

// Create toast container if it doesn't exist
function createToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        // Use inset-x to prevent clipping on small screens and align items to the right
        toastContainer.className = 'fixed inset-x-4 top-4 z-50 space-y-2 flex flex-col items-end';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

// Create individual toast element
function createToastElement(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `
        max-w-lg w-full bg-white shadow-lg rounded-lg pointer-events-auto 
        ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all 
        duration-300 ease-in-out translate-x-0 opacity-100
    `;

    // Get icon and colors based on type
    const getToastConfig = (type) => {
        switch (type) {
            case 'success':
                return {
                    icon: `<svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>`,
                    bgColor: 'bg-green-50',
                    textColor: 'text-green-800'
                };
            case 'error':
                return {
                    icon: `<svg class="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>`,
                    bgColor: 'bg-red-50',
                    textColor: 'text-red-800'
                };
            case 'warning':
                return {
                    icon: `<svg class="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>`,
                    bgColor: 'bg-yellow-50',
                    textColor: 'text-yellow-800'
                };
            case 'info':
                return {
                    icon: `<svg class="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>`,
                    bgColor: 'bg-blue-50',
                    textColor: 'text-blue-800'
                };
            default:
                return {
                    icon: `<svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>`,
                    bgColor: 'bg-gray-50',
                    textColor: 'text-gray-800'
                };
        }
    };

    const config = getToastConfig(type);

    toast.innerHTML = `
        <div class="p-4">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    ${config.icon}
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium ${config.textColor} break-words whitespace-normal">
                        ${message}
                    </p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                    <button class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onclick="(function(btn){var el=btn.closest('.pointer-events-auto'); if(el) el.remove();})(this)">
                        <span class="sr-only">Close</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    return toast;
}

// Remove toast with animation
function removeToast(toast) {
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Main toast function
export function toast(message, type = 'success', duration = 4000) {
  const container = createToastContainer();
  const toastElement = createToastElement(message, type);

  container.appendChild(toastElement);

    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            removeToast(toastElement);
        }, duration);
    }

  return toastElement;
}

// Convenience methods so callers can use toast.success(...) and toast.error(...)
// These wrap the main toast function with common types.
toast.success = (message, duration = 4000) => toast(message, 'success', duration);
toast.error = (message, duration = 4000) => toast(message, 'error', duration);
toast.info = (message, duration = 4000) => toast(message, 'info', duration);
toast.warning = (message, duration = 4000) => toast(message, 'warning', duration);

// Export as default for compatibility
export default toast;