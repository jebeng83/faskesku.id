// Toast notification utility
let toastContainer = null;

// Create toast container if it doesn't exist
function createToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

// Create individual toast element
function createToastElement(message, type = 'success') {
    const toast = document.createElement('div');
    
    // Base classes
    let bgColor = 'bg-green-500';
    let textColor = 'text-white';
    let icon = '✓';
    
    // Set colors and icons based on type
    switch (type) {
        case 'error':
            bgColor = 'bg-red-500';
            icon = '✕';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            icon = '⚠';
            break;
        case 'info':
            bgColor = 'bg-blue-500';
            icon = 'ℹ';
            break;
        default:
            bgColor = 'bg-green-500';
            icon = '✓';
    }
    
    toast.className = `${bgColor} ${textColor} px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 min-w-80 max-w-md transform transition-all duration-300 ease-in-out opacity-0 translate-x-full`;
    
    toast.innerHTML = `
        <span class="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-white bg-opacity-20 rounded-full text-sm font-bold">
            ${icon}
        </span>
        <span class="flex-1 text-sm font-medium">${message}</span>
        <button class="flex-shrink-0 ml-2 text-white hover:text-gray-200 focus:outline-none" onclick="this.parentElement.remove()">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </button>
    `;
    
    return toast;
}

// Main toast function
export function toast(message, type = 'success', duration = 4000) {
    const container = createToastContainer();
    const toastElement = createToastElement(message, type);
    
    container.appendChild(toastElement);
    
    // Animate in
    setTimeout(() => {
        toastElement.classList.remove('opacity-0', 'translate-x-full');
        toastElement.classList.add('opacity-100', 'translate-x-0');
    }, 10);
    
    // Auto remove after duration
    setTimeout(() => {
        if (toastElement.parentElement) {
            toastElement.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => {
                if (toastElement.parentElement) {
                    toastElement.remove();
                }
            }, 300);
        }
    }, duration);
}

// Convenience methods
toast.success = (message, duration) => toast(message, 'success', duration);
toast.error = (message, duration) => toast(message, 'error', duration);
toast.warning = (message, duration) => toast(message, 'warning', duration);
toast.info = (message, duration) => toast(message, 'info', duration);

export default toast;