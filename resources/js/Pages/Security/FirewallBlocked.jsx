import React from "react";
import { usePage } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";

export default function FirewallBlocked() {
    const { ip, reason, codes = [], blocked_at, blocked_until } =
        usePage().props || {};

    const formatDateTime = (value) => {
        if (!value) return "-";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return date.toLocaleString();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 px-6 py-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40">
                        <AlertCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Akses Diblokir Sementara
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Sistem keamanan mendeteksi aktivitas tidak biasa dari
                            koneksi ini.
                        </p>
                    </div>
                </div>

                <div className="mt-4 space-y-3 text-sm text-gray-800 dark:text-gray-100">
                    <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                            Alamat IP
                        </span>
                        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                            {ip || "-"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                            Diblokir sejak
                        </span>
                        <span>{formatDateTime(blocked_at)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                            Perkiraan berakhir
                        </span>
                        <span>{formatDateTime(blocked_until)}</span>
                    </div>

                    {reason && (
                        <div className="mt-2">
                            <div className="text-gray-500 dark:text-gray-400">
                                Keterangan
                            </div>
                            <div className="font-medium mt-0.5">{reason}</div>
                        </div>
                    )}

                    {codes.length > 0 && (
                        <div className="mt-2">
                            <div className="text-gray-500 dark:text-gray-400">
                                Kode respons yang terdeteksi
                            </div>
                            <div className="font-mono text-xs bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded mt-0.5 break-words">
                                {codes.join(", ")}
                            </div>
                        </div>
                    )}
                </div>

                <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                    Jika Anda merasa ini kesalahan, periksa koneksi jaringan
                    Anda atau hubungi administrator sistem. Coba akses ulang
                    beberapa saat lagi setelah blokir berakhir.
                </p>
            </div>
        </div>
    );
}

