import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";

function formatDateTime(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
}

function FirewallBlockedListPage() {
    const { items = [] } = usePage().props;
    const [processingId, setProcessingId] = useState(null);

    const handleUnblock = (item) => {
        if (
            !confirm(
                `Lepas blokir untuk IP ${item.ip_address}? Aktivitas baru akan dipantau kembali oleh firewall.`
            )
        ) {
            return;
        }

        setProcessingId(item.id);

        router.delete(route("security.firewall.unblock", item.id), {
            preserveScroll: true,
            onFinish: () => setProcessingId(null),
        });
    };

    return (
        <div className="space-y-6">
            <Head title="Daftar IP Diblokir" />

            <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Daftar IP yang Diblokir Firewall
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
                    Pantau alamat IP yang sementara diblokir oleh firewall aplikasi
                    dan lepaskan blokir jika diperlukan.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Total {items.length} IP dalam daftar blokir.
                    </div>
                    <Link
                        href={route("security.firewall.index")}
                        className="text-xs px-3 py-1.5 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/40"
                    >
                        Pengaturan Firewall
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                                    IP Address
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                                    Alasan
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                                    Jumlah Hit
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                                    Kode Respons
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                                    Diblokir Sejak
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                                    Berakhir
                                </th>
                                <th className="px-4 py-2 text-right font-medium text-gray-700 dark:text-gray-200">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        Belum ada IP yang diblokir oleh firewall.
                                    </td>
                                </tr>
                            )}
                            {items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/80 dark:hover:bg-gray-800/60"
                                >
                                    <td className="px-4 py-2 font-mono text-xs">
                                        {item.ip_address}
                                    </td>
                                    <td className="px-4 py-2 max-w-xs">
                                        <div className="text-xs text-gray-800 dark:text-gray-100 line-clamp-2">
                                            {item.reason || "-"}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                                            {item.hits ?? "-"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="font-mono text-[11px] bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded block max-w-xs truncate">
                                            {Array.isArray(item.codes) && item.codes.length
                                                ? item.codes.join(", ")
                                                : "-"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-xs text-gray-700 dark:text-gray-200">
                                            {formatDateTime(item.blocked_at)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-xs text-gray-700 dark:text-gray-200">
                                            {formatDateTime(item.expires_at)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <button
                                            type="button"
                                            onClick={() => handleUnblock(item)}
                                            disabled={processingId === item.id}
                                            className="inline-flex items-center px-3 py-1.5 rounded-md border border-red-500 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-900/40"
                                        >
                                            {processingId === item.id
                                                ? "Memproses..."
                                                : "Lepas Blokir"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

FirewallBlockedListPage.layout = (page) => (
    <SidebarPengaturan title="Pengaturan Firewall">{page}</SidebarPengaturan>
);

export default FirewallBlockedListPage;

