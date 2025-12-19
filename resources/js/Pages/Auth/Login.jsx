import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, Globe } from "lucide-react";

export default function Login() {
    const { wallpaperDataUrl: propWallpaper, instansi: propInstansi } =
        usePage().props || {};
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Dynamic wallpaper dari props server (guest-safe)
    const [wallpaperUrl, setWallpaperUrl] = useState(
        propWallpaper || "/img/wallpaper.jpg"
    );
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

    const isValid = username.trim().length > 0 && password.trim().length > 0;

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
        <div className="min-h-screen w-full relative md:grid md:grid-cols-3">
            {/* Kiri: wallpaper 2/3 layar (mobile: full-screen background) */}
            <div className="absolute inset-0 md:relative md:col-span-2 min-h-screen z-0">
                <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url('${wallpaperUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 via-emerald-800/30 to-transparent" />
                {/* Tagline di kiri bawah */}
                <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10">
                    <p className="text-emerald-50/95 text-xs md:text-sm font-medium">
                        Faskesku Indonesia Siap Menjadi Solusi Faskes Anda
                    </p>
                    <h2 className="mt-2 text-white/70 drop-shadow-lg text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
                        Faskesku.id
                    </h2>
                </div>
            </div>

            {/* Kanan: panel login 1/3 layar (mobile: centered overlay) */}
            <div className="relative z-10 md:col-span-1 min-h-screen flex items-center justify-center bg-transparent md:bg-white px-4 sm:px-6 md:px-8">
                <motion.div
                    className="w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl bg-white/95 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Brand header menggunakan nama instansi dari tabel `setting.nama_instansi` */}
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-center">
                            <div className="text-3xl font-extrabold tracking-tight text-blue-600">
                                {instansi || "Abahhost"}
                            </div>
                        </div>
                        <h1 className="mt-3 text-center text-lg md:text-xl font-semibold text-gray-800">
                            Masuk ke Aplikasi
                        </h1>
                    </div>

                    {/* Form */}
                    <form
                        className="px-6 pb-6 pt-4 space-y-5"
                        onSubmit={submit}
                    >
                        {/* Email/Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                                <User className="w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                    placeholder="Contoh: abahhost@gmail.com"
                                    className="w-full bg-transparent placeholder-gray-400 text-gray-900 focus:outline-none text-sm"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Kata Sandi
                            </label>
                            <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                                <Lock className="w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    placeholder="Contoh: Saifulu123456"
                                    className="w-full bg-transparent placeholder-gray-400 text-gray-900 focus:outline-none text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                    aria-label={
                                        showPassword
                                            ? "Sembunyikan kata sandi"
                                            : "Tampilkan kata sandi"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex items-center justify-between text-xs text-gray-700">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) =>
                                        setRemember(e.target.checked)
                                    }
                                    className="rounded border-gray-400"
                                />
                                Ingat saya
                            </div>
                            <a
                                href="#"
                                className="text-blue-600 hover:underline"
                            >
                                Lupa kata sandi?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing || !isValid}
                            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-600 disabled:bg-blue-600 px-4 py-2.5 text-white shadow"
                        >
                            {processing ? "Masuk..." : "Masuk"}
                        </button>

                        {/* Register link */}
                        <p className="text-center text-xs text-gray-600 mt-3">
                            Belum punya akun abahhost?{" "}
                            <a
                                href="#"
                                className="text-blue-600 hover:underline"
                            >
                                Daftar
                            </a>
                        </p>
                    </form>

                    {/* Footer kecil */}
                    <div className="px-6 pb-4">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                            <Globe className="w-3.5 h-3.5" />
                            <span>Pilih bahasa</span>
                            <span className="font-semibold">IND</span>
                        </div>
                        <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-gray-500">
                            <a href="#" className="hover:underline">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:underline">
                                Terms and Condition
                            </a>
                        </div>
                        <p className="mt-2 text-center text-[10px] text-gray-400">
                            {new Date().getFullYear()} · PT Abahhost Indonesia
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
