import React from 'react';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

// Robust resolver: support .jsx/.js/.tsx and handle case sensitivity gracefully
createInertiaApp({
  resolve: (name) => {
    const normalized = name.replace(/^\//, '').replace(/\\/g, '/');

    // Prefer import.meta.glob for Vite-optimized chunks
    const pages = import.meta.glob('./Pages/**/*.{jsx,js,tsx,ts}');
    const candidates = [
      `./Pages/${normalized}.jsx`,
      `./Pages/${normalized}.js`,
      `./Pages/${normalized}.tsx`,
      `./Pages/${normalized}.ts`,
    ];
    for (const key of candidates) {
      if (pages[key]) return pages[key]();
    }

    // Fallback to dynamic import to cope with newly added files in dev or case-insensitive FS quirks
    return import(`./Pages/${normalized}.jsx`).catch(() => import(`./Pages/${normalized}.js`)).catch(() => {
      throw new Error(`Page not found: ${name}`);
    });
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: {
    delay: 250,
    color: '#29d',
    includeCSS: true,
    showSpinner: false,
  },
});

// Handle 419 CSRF Token Expired Error for Inertia
// Inertia akan otomatis handle 419 error melalui backend redirect dengan flash message
// Flash message akan tersedia di page props dan bisa ditampilkan di UI

