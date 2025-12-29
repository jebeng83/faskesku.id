import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";

function NumberInput({ label, name, value, onChange, min, max, suffix, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                {label}
            </label>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    name={name}
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    className="w-32 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {suffix && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {suffix}
                    </span>
                )}
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
}

function FirewallSettingsPage() {
    const { setting: initial } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        enabled: initial.enabled,
        window_seconds: initial.window_seconds,
        threshold: initial.threshold,
        block_minutes: initial.block_minutes,
    });

    const [saved, setSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaved(false);
        put(route("security.firewall.update"), {
            preserveScroll: true,
            onSuccess: () => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            },
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Pengaturan Firewall Aplikasi
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
                    Atur sensitivitas firewall aplikasi untuk melindungi sistem dari
                    percobaan akses yang tidak wajar tanpa mengganggu pengguna normal.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 space-y-5 max-w-2xl"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Status Firewall
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Matikan hanya saat troubleshooting, lalu aktifkan kembali.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setData("enabled", !data.enabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            data.enabled
                                ? "bg-green-500"
                                : "bg-gray-300 dark:bg-gray-600"
                        }`}
                    >
                        <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                                data.enabled ? "translate-x-5" : "translate-x-1"
                            }`}
                        />
                    </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
                    <NumberInput
                        label="Window waktu"
                        name="window_seconds"
                        value={data.window_seconds}
                        onChange={(e) =>
                            setData("window_seconds", Number(e.target.value))
                        }
                        min={10}
                        max={3600}
                        suffix="detik"
                        error={errors.window_seconds}
                    />

                    <NumberInput
                        label="Jumlah error sebelum IP diblokir"
                        name="threshold"
                        value={data.threshold}
                        onChange={(e) =>
                            setData("threshold", Number(e.target.value))
                        }
                        min={1}
                        max={1000}
                        suffix="respon error"
                        error={errors.threshold}
                    />

                    <NumberInput
                        label="Durasi blokir"
                        name="block_minutes"
                        value={data.block_minutes}
                        onChange={(e) =>
                            setData("block_minutes", Number(e.target.value))
                        }
                        min={1}
                        max={1440}
                        suffix="menit"
                        error={errors.block_minutes}
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">
                        Contoh: dengan window 60 detik dan threshold 30, IP akan
                        diblokir jika menghasilkan 30 response error atau lebih
                        dalam 1 menit.
                    </p>
                    <div className="flex items-center gap-2">
                        {saved && (
                            <span className="text-xs text-green-600 dark:text-green-400">
                                Tersimpan
                            </span>
                        )}
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium shadow-sm"
                        >
                            {processing ? "Menyimpan..." : "Simpan Pengaturan"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

FirewallSettingsPage.layout = (page) => (
    <SidebarPengaturan title="Pengaturan Firewall">{page}</SidebarPengaturan>
);

export default FirewallSettingsPage;

