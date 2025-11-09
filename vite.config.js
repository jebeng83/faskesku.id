import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { wayfinder } from "@laravel/vite-plugin-wayfinder";

export default defineConfig({
	plugins: [
		laravel({
			input: ["resources/css/app.css", "resources/js/app.jsx"],
			refresh: true,
		}),
		tailwindcss(),
		react(),
		wayfinder(),
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
	 	host: '127.0.0.1',
	 	port: Number(process.env.VITE_PORT || process.env.PORT || 5177),
	 	strictPort: false,
	 	// Do not hardcode HMR port; let Vite use the actual dev server port to avoid mismatches
	},
});
