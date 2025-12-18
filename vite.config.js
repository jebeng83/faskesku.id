import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
let wayfinderPluginFactory = null;
try {
    const mod = await import("@laravel/vite-plugin-wayfinder");
    wayfinderPluginFactory = mod.wayfinder || null;
} catch {}

export default defineConfig(() => ({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        tailwindcss(),
        react(),
        ...(wayfinderPluginFactory ? [wayfinderPluginFactory()] : []),
    ],
	build: {
		// Increase warning threshold and split vendor libraries into separate chunks
		chunkSizeWarningLimit: 1024,
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom'],
					inertia: ['@inertiajs/react'],
					vendor: [
						'axios', 'ziggy-js', 'date-fns',
						'framer-motion', 'motion',
						'@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities',
						'recharts', 'lucide-react', '@heroicons/react'
					],
				},
			},
		},
	},
    server: {
        host: 'localhost',
        port: Number(process.env.VITE_PORT || process.env.PORT || 5177),
        strictPort: false,
        cors: true,
        origin: process.env.VITE_DEV_ORIGIN || 'http://localhost:5177',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
            'Access-Control-Allow-Headers': '*',
        },
        // Do not hardcode HMR port; let Vite use the actual dev server port to avoid mismatches
        proxy: {
            '/farmasi': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
            '/_boost': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
            '/sanctum': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
            '/favicon.ico': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
}));
