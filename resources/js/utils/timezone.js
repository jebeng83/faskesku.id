// Timezone utility functions
let appConfig = null;

// Fetch application configuration from backend
export const fetchAppConfig = async () => {
    if (appConfig) return appConfig;
    
    try {
        const response = await fetch('/api/config');
        const result = await response.json();
        
        if (result.success) {
            appConfig = result.data;
            return appConfig;
        }
    } catch (error) {
        console.warn('Failed to fetch app config, using fallback timezone:', error);
    }
    
    // Fallback configuration
    appConfig = {
        timezone: 'Asia/Jakarta',
        locale: 'id',
        name: 'Faskesku.id',
        url: window.location.origin
    };
    
    return appConfig;
};

// Get current date and time in the configured timezone
export const getCurrentDateTime = async () => {
    const config = await fetchAppConfig();
    const now = new Date();
    
    // Convert to the configured timezone
    const options = {
        timeZone: config.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const parts = formatter.formatToParts(now);
    
    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const hour = parts.find(part => part.type === 'hour').value;
    const minute = parts.find(part => part.type === 'minute').value;
    
    return {
        date: `${year}-${month}-${day}`,
        time: `${hour}:${minute}`,
        dateFormatted: `${day}/${month}/${year}`,
        timeFormatted: `${hour}:${minute}`,
        timezone: config.timezone
    };
};

// Get date string in configured timezone (YYYY-MM-DD format)
export const getDateString = async () => {
    const dateTime = await getCurrentDateTime();
    return dateTime.date;
};

// Get time string in configured timezone (HH:MM format)
export const getTimeString = async () => {
    const dateTime = await getCurrentDateTime();
    return dateTime.time;
};

// Get formatted date string (DD/MM/YYYY format)
export const getFormattedDateString = async () => {
    const dateTime = await getCurrentDateTime();
    return dateTime.dateFormatted;
};

// Get formatted time string (HH:MM format)
export const getFormattedTimeString = async () => {
    const dateTime = await getCurrentDateTime();
    return dateTime.timeFormatted;
};

// Format a given date to the configured timezone
export const formatDateToTimezone = async (date, format = 'date') => {
    const config = await fetchAppConfig();
    const dateObj = new Date(date);
    
    const options = {
        timeZone: config.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const parts = formatter.formatToParts(dateObj);
    
    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const hour = parts.find(part => part.type === 'hour').value;
    const minute = parts.find(part => part.type === 'minute').value;
    
    switch (format) {
        case 'date':
            return `${year}-${month}-${day}`;
        case 'time':
            return `${hour}:${minute}`;
        case 'formatted-date':
            return `${day}/${month}/${year}`;
        case 'formatted-time':
            return `${hour}:${minute}`;
        case 'datetime':
            return `${year}-${month}-${day} ${hour}:${minute}`;
        default:
            return `${year}-${month}-${day}`;
    }
};

// Get timezone information
export const getTimezoneInfo = async () => {
    const config = await fetchAppConfig();
    return {
        timezone: config.timezone,
        locale: config.locale
    };
};