import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";

export default function Login() {
    const { wallpaperDataUrl: propWallpaper, instansi: propInstansi } = usePage().props || {};
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    // Dynamic wallpaper dari props server (guest-safe)
    const [wallpaperUrl, setWallpaperUrl] = useState(propWallpaper || "/img/wallpaper.jpg");
    const [instansi, setInstansi] = useState(propInstansi || "");

    useEffect(() => {
        // Preload jika ada wallpaper dari props
        if (propWallpaper) {
            const img = new Image();
            img.onload = () => setWallpaperUrl(propWallpaper);
            img.src = propWallpaper;
        }
        if (propInstansi) setInstansi(propInstansi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propWallpaper, propInstansi]);

    function submit(e) {
        e.preventDefault();

        setProcessing(true);
        setErrors({});

		router.post(
			"/login",
			{ username, password, remember },
			{
				onError: (e) => {
					console.error("Login error:", e);
					setErrors(e);
					setProcessing(false);
				},
				onSuccess: () => {
					console.log("Login successful");
					setProcessing(false);
				},
				onFinish: () => {
					setProcessing(false);
				},
			}
		);
	}

    return (
        <div className="min-h-screen relative">
            {/* Wallpaper from DB (legacy `setting`) */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url('${wallpaperUrl}')` }}
            />
            {/* Two-door overlay opening effect */}
            <motion.div
                className="absolute inset-y-0 left-0 w-1/2 z-10 bg-gradient-to-br from-slate-900/50 via-slate-900/40 to-slate-800/30 border-r border-white/15 shadow-2xl backdrop-blur-[2px]"
                style={{ transformOrigin: 'right center' }}
                initial={{ rotateY: 0, opacity: 1 }}
                animate={{ rotateY: -85, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.15 }}
            />
            <motion.div
                className="absolute inset-y-0 right-0 w-1/2 z-10 bg-gradient-to-tl from-slate-900/50 via-slate-900/40 to-slate-800/30 border-l border-white/15 shadow-2xl backdrop-blur-[2px]"
                style={{ transformOrigin: 'left center' }}
                initial={{ rotateY: 0, opacity: 1 }}
                animate={{ rotateY: 85, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.15 }}
            />
            {/* Center seam accent that fades out */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px z-10 bg-white/40 dark:bg-white/20"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
            />
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/70 via-slate-900/55 to-slate-900/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md" style={{ perspective: 1300 }}>
                    <motion.div
                        className="rounded-2xl bg-white/80 md:bg-white/92 dark:bg-gray-900/75 md:dark:bg-gray-900/85 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10 border border-white/20 dark:border-gray-800 px-6 py-7 sm:px-8 sm:py-8 transform-gpu will-change-transform"
                        style={{ transformOrigin: 'left center' }}
                        initial={{ opacity: 0, x: -10, y: 16, scale: 0.965, rotateY: -26 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotateY: [ -26, 8, 0 ] }}
                        transition={{
                            delay: 0.6,
                            // Gunakan tween untuk multi-keyframes rotateY agar tidak kena batasan spring (2 keyframes)
                            rotateY: { type: 'tween', duration: 0.9, ease: 'easeInOut' },
                            // Property lain tetap spring untuk feel yang responsif
                            x: { type: 'spring', stiffness: 230, damping: 18, mass: 0.95 },
                            y: { type: 'spring', stiffness: 230, damping: 18, mass: 0.95 },
                            scale: { type: 'spring', stiffness: 230, damping: 18, mass: 0.95 },
                            opacity: { type: 'tween', duration: 0.6, ease: 'easeOut' },
                        }}
                        whileHover={{ y: -2, scale: 1.006, rotateY: 1.5, rotateX: -1.5 }}
                        whileTap={{ scale: 0.996, rotateY: 0, rotateX: 0 }}
                    >
                        <div className="mb-4">
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Masuk</h1>
                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{instansi ? `Selamat datang di ${instansi}` : `Silakan masuk untuk melanjutkan`}</p>
                        </div>

                        <form className="mt-4 space-y-5" onSubmit={submit}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                                <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-300/70 bg-white/95 dark:bg-slate-800/60 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500">
                                    <User className="w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        placeholder="Masukkan username"
                                        className="w-full bg-transparent placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none text-sm"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-1 text-xs text-red-600">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-300/70 bg-white/95 dark:bg-slate-800/60 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500">
                                    <Lock className="w-4 h-4 text-slate-500" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Masukkan password"
                                        className="w-full bg-transparent placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="rounded border-slate-400 bg-transparent"
                                    />
                                    Ingat saya
                                </label>
                                <a href="#" className="text-indigo-600 hover:underline">Lupa password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-sky-600 px-4 py-2.5 text-white shadow hover:from-indigo-700 hover:to-sky-700 disabled:opacity-60"
                            >
                                {processing ? "Masuk..." : "Masuk"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
