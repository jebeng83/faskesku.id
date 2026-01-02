import { useCallback, useEffect, useMemo, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRalan from "@/Layouts/SidebarRalan";
import Pagination from "@/Components/Pagination";

export default function SuratSakitList({ suratSakit, filters }) {
    const initial = useMemo(
        () => ({
            search: filters?.search || "",
            start_date: filters?.start_date || "",
            end_date: filters?.end_date || "",
        }),
        [filters]
    );

    const [search, setSearch] = useState(initial.search);
    const [startDate, setStartDate] = useState(initial.start_date);
    const [endDate, setEndDate] = useState(initial.end_date);

    const applyFilters = useCallback(
        (next = {}) => {
            router.get(
                route("rawat-jalan.surat-sakit.index"),
                {
                    search,
                    start_date: startDate,
                    end_date: endDate,
                    ...next,
                },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        },
        [endDate, search, startDate]
    );

    useEffect(() => {
        const t = setTimeout(() => {
            applyFilters();
        }, 400);
        return () => clearTimeout(t);
    }, [applyFilters, search]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters, endDate, startDate]);

    const clearFilters = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
        router.get(route("rawat-jalan.surat-sakit.index"), {}, { replace: true });
    };

    return (
        <SidebarRalan>
            <Head title="Surat Sakit" />

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Surat Sakit
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Data dari tabel suratsakit
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={route("rawat-jalan.index")}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-5 border-b border-gray-200/70 dark:border-gray-700/70 bg-gradient-to-r from-red-50/70 via-rose-50/70 to-orange-50/70 dark:from-gray-800/70 dark:via-gray-800/70 dark:to-gray-800/70">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <div className="md:col-span-6">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Pencarian
                                </label>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="No Surat / No Rawat / Nama / No RM / Lama Sakit"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Dari Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Sampai Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-end">
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-xs font-semibold text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-3 py-2 hover:bg-white dark:hover:bg-gray-800"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                                        No Surat
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                                        Nama
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                                        No. RM
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                                        No Rawat
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                                        Tanggal Awal
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                                        Tanggal Akhir
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">
                                        Lama Sakit
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                                {suratSakit?.data?.length ? (
                                    suratSakit.data.map((row) => (
                                        <tr key={row.no_surat}>
                                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                {row.no_surat}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                                {row.nm_pasien || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                {row.no_rkm_medis || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                {row.no_rawat || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                {row.tanggalawal ? row.tanggalawal.split('-').reverse().join('-') : "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                {row.tanggalakhir ? row.tanggalakhir.split('-').reverse().join('-') : "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                                {row.lamasakit || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                {row.no_rawat ? (
                                                    <Link
                                                        href={route(
                                                            "rawat-jalan.buat-surat",
                                                            { no_rawat: row.no_rawat, template: 'sakit' }
                                                        )}
                                                        className="inline-flex items-center rounded-lg bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs font-semibold"
                                                    >
                                                        Buka
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs text-gray-400">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            Tidak ada data.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {suratSakit?.links && (
                        <Pagination
                            links={suratSakit.links}
                            from={suratSakit.from}
                            to={suratSakit.to}
                            total={suratSakit.total}
                        />
                    )}
                </div>
            </div>
        </SidebarRalan>
    );
}
