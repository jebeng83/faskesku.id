import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";

export default function SettingBridingMobileJkn({ setting, flash }) {
    // Animations
    const fade = {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    };
    const stagger = {
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
    };
    const item = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        // Kredensial utama Mobile JKN
        user_mobilejkn: setting?.user_mobilejkn || "",
        pass_mobilejkn: setting?.pass_mobilejkn || "",
        cons_id_mobilejkn: setting?.cons_id_mobilejkn || "",
        secretkey_mobilejkn: setting?.secretkey_mobilejkn || "",
        userkey_mobilejkn: setting?.userkey_mobilejkn || "",
        // Endpoint base URL (ambil dari DB sesuai permintaan)
        base_url_mobilejkn: setting?.base_url_mobilejkn || "",
        base_url_v1: setting?.base_url_v1 || "",
        base_url_v2: setting?.base_url_v2 || "",
        // Kredensial Antrol
        username_antrol: setting?.username_antrol || "",
        password_antrol: setting?.password_antrol || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("pcare.setting.mobilejkn.store"));
    };

    const onReset = (e) => {
        e.preventDefault();
        if (confirm("Yakin ingin mereset pengaturan Mobile JKN?")) {
            window
                .fetch(route("pcare.setting.mobilejkn.destroy"), {
                    method: "DELETE",
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]').getAttribute("content"),
                        Accept: "application/json",
                    },
                })
                .then(() => {
                    reset();
                    window.location.reload();
                })
                .catch(() => {
                    alert("Gagal mereset pengaturan");
                });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Head title="Setting Bridging Mobile JKN" />
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fade}
                    className="mb-6 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <path d="M12 3l8 4-8 4-8-4 8-4z" />
                                <path d="M4 7v6l8 4 8-4V7" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
                                Setting Bridging Mobile JKN
                            </h1>
                            <p className="text-xs text-slate-500">
                                Konfigurasi kredensial dan key untuk integrasi Mobile JKN.
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route("pcare.index")}
                        className="text-xs inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                        ← Kembali ke Menu PCare
                    </Link>
                </motion.div>

                {/* Flash success */}
                {flash?.success && (
                    <motion.div
                        variants={item}
                        initial="hidden"
                        animate="show"
                        className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-700 shadow-sm"
                    >
                        {flash.success}
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                    {/* Info card */}
                    <motion.div
                        variants={item}
                        className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm ring-1 ring-slate-200"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                >
                                    <path d="M5 12l5 5L20 7" />
                                </svg>
                            </div>
                            <div className="text-slate-800 font-medium">Petunjuk</div>
                        </div>
                        <div className="mt-2 text-xs text-slate-500 leading-relaxed">
                            - Isi kredensial sesuai data dari BPJS.
                            <br />- Simpan untuk menerapkan perubahan.
                            <br />- Gunakan Reset untuk mengosongkan pengaturan.
                        </div>
                    </motion.div>

                    {/* Form card */}
                    <motion.form
                        onSubmit={onSubmit}
                        variants={item}
                        className="md:col-span-2 space-y-5 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm ring-1 ring-slate-200"
                    >
                        {/* Endpoint URLs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700">Base URL Mobile JKN</label>
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    value={data.base_url_mobilejkn}
                                    onChange={(e) => setData("base_url_mobilejkn", e.target.value)}
                                    maxLength={200}
                                    placeholder="Contoh: https://apijkn-dev.bpjs-kesehatan.go.id/mobilejkn"
                                    required
                                />
                                {errors.base_url_mobilejkn && (
                                    <p className="mt-1 text-xs text-red-600">{errors.base_url_mobilejkn}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Base URL v1 (opsional)</label>
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    value={data.base_url_v1}
                                    onChange={(e) => setData("base_url_v1", e.target.value)}
                                    maxLength={200}
                                    placeholder="Contoh: https://apijkn-dev.bpjs-kesehatan.go.id/mobilejkn-v1"
                                />
                                {errors.base_url_v1 && (
                                    <p className="mt-1 text-xs text-red-600">{errors.base_url_v1}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Base URL v2 (opsional)</label>
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    value={data.base_url_v2}
                                    onChange={(e) => setData("base_url_v2", e.target.value)}
                                    maxLength={200}
                                    placeholder="Contoh: https://apijkn-dev.bpjs-kesehatan.go.id/mobilejkn-v2"
                                />
                                {errors.base_url_v2 && (
                                    <p className="mt-1 text-xs text-red-600">{errors.base_url_v2}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">User Mobile JKN</label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                value={data.user_mobilejkn}
                                onChange={(e) => setData("user_mobilejkn", e.target.value)}
                                maxLength={20}
                                placeholder="Username Mobile JKN"
                                required
                            />
                            {errors.user_mobilejkn && (
                                <p className="mt-1 text-xs text-red-600">{errors.user_mobilejkn}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Password Mobile JKN</label>
                            <input
                                type="password"
                                className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                value={data.pass_mobilejkn}
                                onChange={(e) => setData("pass_mobilejkn", e.target.value)}
                                maxLength={20}
                                placeholder="Password Mobile JKN"
                                required
                            />
                            {errors.pass_mobilejkn && (
                                <p className="mt-1 text-xs text-red-600">{errors.pass_mobilejkn}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Cons ID Mobile JKN</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    value={data.cons_id_mobilejkn}
                                    onChange={(e) => setData("cons_id_mobilejkn", e.target.value)}
                                    maxLength={20}
                                    placeholder="Cons ID"
                                    required
                                />
                                {errors.cons_id_mobilejkn && (
                                    <p className="mt-1 text-xs text-red-600">{errors.cons_id_mobilejkn}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Secret Key Mobile JKN</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    value={data.secretkey_mobilejkn}
                                    onChange={(e) => setData("secretkey_mobilejkn", e.target.value)}
                                    maxLength={200}
                                    placeholder="Secret Key"
                                    required
                                />
                                {errors.secretkey_mobilejkn && (
                                    <p className="mt-1 text-xs text-red-600">{errors.secretkey_mobilejkn}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">User Key Mobile JKN</label>
                            <input
                                type="password"
                                className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                value={data.userkey_mobilejkn}
                                onChange={(e) => setData("userkey_mobilejkn", e.target.value)}
                                maxLength={200}
                                placeholder="User Key dari BPJS Mobile JKN"
                                required
                            />
                            {errors.userkey_mobilejkn && (
                                <p className="mt-1 text-xs text-red-600">{errors.userkey_mobilejkn}</p>
                            )}
                        </div>

                        {/* Kredensial Antrol (opsional) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Username Antrol</label>
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    value={data.username_antrol}
                                    onChange={(e) => setData("username_antrol", e.target.value)}
                                    maxLength={50}
                                    placeholder="Username untuk layanan Antrol (opsional)"
                                />
                                {errors.username_antrol && (
                                    <p className="mt-1 text-xs text-red-600">{errors.username_antrol}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Password Antrol</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-lg border-slate-300 bg-white/90 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    value={data.password_antrol}
                                    onChange={(e) => setData("password_antrol", e.target.value)}
                                    maxLength={50}
                                    placeholder="Password untuk layanan Antrol (opsional)"
                                />
                                {errors.password_antrol && (
                                    <p className="mt-1 text-xs text-red-600">{errors.password_antrol}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-sky-600 px-4 py-2 text-white shadow hover:from-indigo-700 hover:to-sky-700 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? "Menyimpan..." : "Simpan Pengaturan"}
                            </button>
                            <button
                                type="button"
                                onClick={onReset}
                                className="inline-flex items-center rounded-lg border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50"
                            >
                                Reset Pengaturan
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    );
}

// Layout: render di dalam SidebarPengaturan
SettingBridingMobileJkn.layout = (page) => (
    <SidebarPengaturan title="Pengaturan" children={page} />
);