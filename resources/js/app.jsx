import React from 'react';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        
        // Convert name to path format
        const path = `./Pages/${name}.jsx`;
        
        if (!pages[path]) {
            console.error(`Page ${name} not found at path: ${path}`);
            console.error('Available pages:', Object.keys(pages));
            throw new Error(`Page ${name} not found.`);
        }
        
        return pages[path];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});


