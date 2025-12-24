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
		// Increase warning threshold; let Vite decide optimal chunking to avoid cyclic order issues
		chunkSizeWarningLimit: 1024,
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
        proxy: (() => {
            const backendUrl = process.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
            return {
                '/farmasi': {
                    target: backendUrl,
                    changeOrigin: true,
                    secure: false,
                },
                '/api': {
                    target: backendUrl,
                    changeOrigin: true,
                    secure: false,
                },
                '/_boost': {
                    target: backendUrl,
                    changeOrigin: true,
                    secure: false,
                },
                '/sanctum': {
                    target: backendUrl,
                    changeOrigin: true,
                    secure: false,
                },
                '/favicon.ico': {
                    target: backendUrl,
                    changeOrigin: true,
                    secure: false,
                },
            };
        })(),
    },
}));
