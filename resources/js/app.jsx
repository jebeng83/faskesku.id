import React from 'react';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

// Enable lazy-loading of route pages using Vite's import.meta.glob
createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const importPage = pages[`./Pages/${name}.jsx`];
        if (!importPage) {
            throw new Error(`Page not found: ${name}`);
        }
        return importPage();
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <App {...props} />
        );
    },
});


